# 🤖 AI Agent Starter Kit

> **A production-ready, plug-and-play AI Agent backend system built with Node.js, Express, SQLite, and OpenAI API.**

Deploy a fully functional multi-agent AI system in under 5 minutes.

---

## ✨ Features

- 🧠 **Multi-Agent System** — Create unlimited agents with custom personalities
- 💬 **Context-Aware Chat** — Sliding window memory (last 10 messages)
- 📊 **Token Tracking** — Monitor prompt/completion/total tokens per message
- 🔐 **JWT Authentication** — Secure user registration and login
- 🗃️ **SQLite Persistence** — Zero-config local database via Knex
- 🎨 **Demo UI** — Beautiful chat interface at `http://localhost:5000`
- 📦 **3 Pre-Built Agent Templates** — Customer Support, Sales, Study Assistant

---

## 🚀 Quick Start (Under 5 Minutes)

### 1. Clone and Install

```bash
cd ai-agent-starter-kit
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Open `.env` and add your keys:

```env
PORT=5000
OPENAI_API_KEY=sk-...your-key-here...
JWT_SECRET=a_long_random_secret_string
DB_PATH=./src/config/database.sqlite
```

### 3. Seed Pre-Built Agents

```bash
npm run seed
```

This creates 3 ready-to-use agents in your database.

### 4. Start the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

### 5. Open the Demo UI

Navigate to: **http://localhost:5000**

1. Register a new account
2. Select an agent from the sidebar
3. Start chatting! 🎉

---

## 📁 Project Structure

```
ai-agent-starter-kit/
│
├── public/
│   └── index.html          # Demo chat UI
│
├── scripts/
│   └── seedAgents.js       # Seed 3 default agents
│
├── src/
│   ├── config/
│   │   └── database.js     # Knex + SQLite setup & schema
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── agentController.js
│   │   └── chatController.js
│   │
│   ├── middleware/
│   │   └── auth.js         # JWT verification
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── agentRoutes.js
│   │   └── chatRoutes.js
│   │
│   ├── services/
│   │   ├── openaiService.js  # OpenAI API wrapper
│   │   ├── agentService.js   # Agent CRUD logic
│   │   └── memoryService.js  # Chat history management
│   │
│   └── app.js              # Express entry point
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔌 API Reference

### Authentication

**Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "myuser", "password": "mypassword"}'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "myuser", "password": "mypassword"}'
```

> **Save the `token` from the response — you'll use it as `Bearer <token>` for all protected routes.**

---

### Agents

**List All Agents**
```bash
curl http://localhost:5000/api/agents \
  -H "Authorization: Bearer <your_token>"
```

**Create a Custom Agent**
```bash
curl -X POST http://localhost:5000/api/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "name": "My Custom Agent",
    "system_prompt": "You are a helpful assistant specialized in cooking recipes.",
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "max_tokens": 800
  }'
```

**Update an Agent**
```bash
curl -X PUT http://localhost:5000/api/agents/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"temperature": 0.5}'
```

**Delete an Agent**
```bash
curl -X DELETE http://localhost:5000/api/agents/1 \
  -H "Authorization: Bearer <your_token>"
```

---

### Chat

**Send a Message**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"agent_id": 1, "message": "Hello! Who are you?"}'
```

**Response:**
```json
{
  "role": "assistant",
  "content": "Hello! I'm your customer support assistant...",
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 32,
    "total_tokens": 77
  }
}
```

---

### System

**Health Check**
```bash
curl http://localhost:5000/health
```

---

## 🎭 Pre-Built Agent Templates

### 1. 🎧 Customer Support Agent
Empathetic, step-by-step problem solver.
- Temperature: `0.5` (focused and accurate)
- Best for: SaaS support bots, e-commerce help

### 2. 💼 Sales Agent
Persuasive and benefit-focused.
- Temperature: `0.7` (conversational but purposeful)
- Best for: Lead qualification, product recommendation

### 3. 📚 Study Assistant
Guides learning through Socratic questioning.
- Temperature: `0.6` (creative yet grounded)
- Best for: EdTech apps, tutoring platforms

---

## ✏️ How to Customize Agents

### Option A — Via API
Use `POST /api/agents` with your own `name`, `system_prompt`, `model`, `temperature`, and `max_tokens`.

### Option B — Edit the Seed Script
Open `scripts/seedAgents.js` and modify the agent objects, then re-run:
```bash
npm run seed
```

### Option C — Directly in the Database
Use any SQLite viewer (e.g. [DB Browser for SQLite](https://sqlitebrowser.org/)) and edit the `agents` table.

---

## 🔧 How to Change the OpenAI Model

In `.env` or per-agent:
- `gpt-4o-mini` — Fast, cheap, great for most use cases ✅ (default)
- `gpt-4o` — Most capable, higher cost
- `gpt-3.5-turbo` — Fastest, most economical

Each agent stores its own `model` field, so you can mix and match.

---

## 🛡️ Security Notes

- Always use a strong, random `JWT_SECRET` in production
- Never commit your `.env` file to Git
- Add `.env` to `.gitignore`

---

## 📄 License

MIT License — Use freely, modify, and sell your builds.

---

> Built with ❤️ using Node.js, Express, OpenAI, and SQLite
