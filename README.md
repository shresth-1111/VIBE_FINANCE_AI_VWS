# 💸 VIBE FINANCE AI

An AI-powered personal finance dashboard that helps users track daily expenses, monitor remaining budget, and receive smart financial insights.

---

## 🚀 Features

- 📊 Real-time expense tracking
- 🧠 AI-generated financial insights
- 🔥 Smart psychological warning system (red alert below 40% remaining budget)
- 📅 Monthly remaining days tracker
- 💰 Budget progress visualization
- 🗑 Add / Delete daily expenses
- ⚡ Lightweight in-browser AI model

---

## 🧠 AI Insight Engine

The AI analyzes:

- Income
- Fixed expenses
- Savings target
- Daily spending
- Remaining usable balance

It provides structured output:

- PERSONALITY analysis
- RISK assessment
- TOP SPENDING CATEGORY
- PRACTICAL SUGGESTION

The model runs locally using `@runanywhere/web-llamacpp`.

---

## 🛠 Tech Stack

- React
- TypeScript
- CSS
- RunAnywhere SDK
- Web LLaMA.cpp
- LocalStorage for persistence

---

## 📂 Project Structure
src/
├── services/
│ ├── aiEngine.ts
│ ├── financeService.ts
├── utils/
│ ├── storage.ts
│ ├── validation.ts
├── pages/
│ ├── Dashboard.tsx
│ ├── Setup.tsx
├── styles/
│ ├── dashboard.css



---

## ⚙️ Installation

1. Clone the repository


2. Navigate into project


3. Install dependencies


4. Run development server


---

## 📌 How It Works

1. User sets income, fixed expenses, and savings target.
2. User adds daily expenses.
3. App calculates remaining usable budget.
4. AI analyzes the data and generates financial insight.
5. If remaining budget drops below 40%, UI shows a red psychological alert.

---

## 🎯 Future Improvements

- Spending trend detection
- Category-based analytics dashboard
- Graph visualization
- Smarter AI prompt engineering
- Cloud deployment

---

## 📜 License

This project is for educational and development purposes.
