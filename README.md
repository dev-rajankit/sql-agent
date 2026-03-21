# 📊 Fullstack SQL AI Agent

Welcome to the **SQL AI Agent**! This project solves a common problem in companies: non-technical team members (like managers or marketers) often need database data but don't know how to write complex SQL queries [1]. 

Instead of building complex dashboards, this application provides a ChatGPT-like interface where users can ask questions in plain English (e.g., *"How much sales did we make today?"*), and the AI will secretly fetch the exact data from the database and reply with a human-friendly answer [1, 4].

## ✨ Features

* **🗣️ Natural Language to SQL:** Ask questions in plain English, and the AI handles the complex database logic.
* **🛠️ Multi-Step Tool Calling:** The AI autonomously calls custom backend tools. It first checks the database blueprint (Schema Tool) and then executes the query (DB Tool) [2].
* **⚡ Real-Time Streaming UI:** Gives users a smooth experience by streaming the AI's response letter-by-letter, just like ChatGPT [5].
* **شف Transparent Execution:** The UI shows interactive loading states (e.g., "Fetching Schema...", "Running Database Query...") so users see the AI's "thought process" [6, 7].
* **☁️ Serverless Architecture:** Fully deployed on Vercel using Next.js API Routes (Serverless Functions) [8].
* **💸 Free API Integration:** Powered by Google Gemini 1.5 Pro (via Vercel AI SDK) for a completely free and powerful AI brain.

## 💻 Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS [9].
* **Backend:** Next.js API Routes [10].
* **AI Integration:** Vercel AI SDK (`@ai-sdk/react`, `@ai-sdk/google`) [1, 11].
* **Database:** Turso (Cloud SQLite) [12].
* **ORM:** Drizzle ORM (for executing SQL queries safely) [13, 14].
* **Validation:** Zod (for structuring AI tool inputs) [15].

## 🏗️ System Architecture

This project follows a highly secure, serverless architecture:
1. **User Input:** The user types a question in the UI.
2. **Secure API:** The Next.js frontend sends the message to a secure backend API route (`/api/chat`) [10].
3. **AI Processing:** The backend forwards the message to the Gemini AI Model.
4. **Tool Calling (Schema):** The AI asks the backend for the database structure [2].
5. **Tool Calling (Query):** The AI generates an SQL query and asks the backend to run it [16].
6. **Database Execution:** Drizzle ORM runs the query on the Turso Database [12, 17].
7. **Streamed Response:** The final data is formatted into an English sentence by the AI and streamed back to the user's screen [5, 18].

## 🚀 Getting Started (Run it Locally)

Follow these steps to run the project on your local machine.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/sql-agent-yt.git
cd sql-agent-yt
\`\`\`

### 2. Install dependencies
\`\`\`bash
pnpm install
\`\`\`

### 3. Set up Environment Variables
Create a `.env.local` file in the root folder and add the following secret keys:
\`\`\`env
# Get this free from Google AI Studio
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Get these free by creating a database on Turso.tech
TURSO_DATABASE_URL=your_turso_db_url_here
TURSO_AUTH_TOKEN=your_turso_auth_token_here
\`\`\`

### 4. Setup the Database
Generate the tables and fill them with dummy data (Products and Sales):
\`\`\`bash
pnpm run db:generate   # Generates the SQL schema
pnpm run db:migrate    # Pushes the tables to Turso
pnpm run db:seed       # Fills the database with dummy sales data
\`\`\`

### 5. Run the Development Server
\`\`\`bash
pnpm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running!

## ⚠️ Security Note
In a real-world production environment, never blindly execute AI-generated SQL queries [17, 19]. Always use a read-only database user and implement strict code guardrails to prevent the AI from generating `DELETE`, `DROP`, or `UPDATE` commands [19].

---
*Built with ❤️ while learning Fullstack AI Development.*
