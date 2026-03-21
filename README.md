# 📊 Fullstack SQL AI Agent

An intelligent **AI-powered database assistant** that allows users to query a database using **natural language instead of SQL**.

---

## 🚀 Problem It Solves

In most companies, non-technical people (managers, analysts, marketers) need data but **don’t know SQL**.

Instead of:

* writing complex queries ❌
* depending on developers ❌
* building dashboards ❌

This app lets users simply ask:

> “How much sales did we make today?”

And the AI:

* understands the question 🧠
* generates SQL ⚙️
* queries the database 📊
* returns a human-friendly answer 💬

---

## ✨ Features

* 🗣️ **Natural Language → SQL**

  * Ask questions in plain English
  * AI handles SQL generation automatically

* 🧠 **AI Tool Calling (Core Feature)**

  * AI first fetches **database schema**
  * Then generates correct SQL query
  * Then executes query using backend tools

* ⚡ **Streaming UI (ChatGPT-like)**

  * Responses appear in real-time
  * Smooth and interactive experience

* 🔍 **Transparent Execution**

  * Shows steps like:

    * "Fetching Schema..."
    * "Running Query..."
  * Helps users understand what AI is doing

* ☁️ **Serverless Architecture**

  * Built using Next.js API routes
  * Deployed easily on Vercel

* 💸 **Free AI Integration**

  * Uses **Google Gemini (1.5 Pro)**
  * No paid OpenAI API required

---

## 💻 Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes (Serverless Functions)
* **AI SDK:** Vercel AI SDK (`@ai-sdk/react`, `@ai-sdk/google`)
* **Database:** Turso (Cloud SQLite)
* **ORM:** Drizzle ORM
* **Validation:** Zod

---

## 🏗️ System Architecture (Important 🔥)

This project follows a **Tool-Calling AI Architecture**.

### 📌 Full Data Flow

```
User → Frontend (Chat UI)
     → Backend API (/api/chat)
     → AI Model (Gemini)
     → Tool Calling (Schema Tool)
     → Tool Calling (DB Tool)
     → Database (Turso)
     → AI formats response
     → Stream back to UI
```

---

### 🧠 Step-by-Step Flow (Simple Explanation)

1. **User asks a question**

   * Example: “Show total sales by region”

2. **Frontend sends request to backend**

   * `/api/chat` route

3. **Backend sends message to AI (Gemini)**

4. **AI decides what to do**

   * Step 1 → calls **schema tool**
   * Step 2 → understands database structure

5. **AI generates SQL query**

   * Example:

     ```sql
     SELECT region, SUM(total_amount) FROM sales GROUP BY region;
     ```

6. **AI calls DB tool**

   * Backend executes query using Drizzle ORM

7. **Database returns result**

8. **AI converts result into human-friendly answer**

   * Example:

     > “North region has highest sales of ₹50,000”

9. **Response is streamed back to UI**

---

### 🧠 Real-World Analogy

Think of it like a **smart data analyst**:

* User = Manager
* AI = Analyst
* Schema = Database knowledge
* DB tool = Analyst running queries
* Final response = Business insight

---



## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/dev-rajankit/sql-agent.git
cd sql-agent
```

---

### 2. Install Dependencies

```bash
pnpm install
```

---

### 3. Setup Environment Variables

Create `.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

TURSO_DATABASE_URL=your_turso_db_url
TURSO_AUTH_TOKEN=your_turso_auth_token
```

---

### 4. Setup Database

```bash
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed
```

---

### 5. Run Project

```bash
pnpm run dev
```

Open:
👉 http://localhost:3000

---

## ⚠️ Security Note

Never blindly execute AI-generated SQL.

Always:

* Use **read-only database**
* Block dangerous queries:

  * `DELETE`
  * `UPDATE`
  * `DROP`

---

## 🎯 What You Learn From This Project

* AI Tool Calling Architecture
* Fullstack AI Integration
* Database + AI connection
* Streaming UI
* Real-world system design

---

## ❤️ Built With Learning Mindset

This project is part of learning **Fullstack AI Development + AI Agents**.

---

## 🔗 Repository

👉 https://github.com/dev-rajankit/sql-agent
