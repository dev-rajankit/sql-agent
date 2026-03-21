import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { google } from "@ai-sdk/google";
import { z } from 'zod';
import { db } from '@/db/db';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const SYSTEM_PROMPT = `You are an expert SQL assistant that helps users query a database using natural language.

Rules:
- Only generate SELECT queries
- Never use INSERT, UPDATE, DELETE, DROP
- Always first check schema using schema tool
- Then generate correct SQL
- Always call db tool to execute query
- Never return raw SQL without executing tool

Respond in simple English.`;

  const result = streamText({
    model: google("gemini-3-flash-preview"), // ✅ stable
    messages: await convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(5),

    tools: {
      // ✅ SCHEMA TOOL
      schema: tool({
        description: 'Get database schema',
        inputSchema: z.object({}),
        execute: async () => {
          return `CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  price REAL,
  stock INTEGER
);

CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  quantity INTEGER,
  total_amount REAL,
  customer_name TEXT,
  region TEXT
);`;
        },
      }),

      // ✅ DB TOOL
      db: tool({
        description: 'Execute SQL query',
        inputSchema: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => {
          console.log("SQL:", query);

          // 🔥 SAFETY (VERY IMPORTANT)
          if (!query.toLowerCase().includes("select")) {
            return "Only SELECT queries are allowed";
          }

          try {
            const result = await db.run(query);
            return JSON.stringify(result);
          } catch (e) {
            return "Query failed";
          }
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}