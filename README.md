# WikiQuiz AI 🧠✨

**WikiQuiz AI** allows users to instantly generate interactive quizzes from any Wikipedia article. Simply paste a URL, and our AI analyzes the content to create a structured quiz with questions, answers, explanations, and related topics.

> **Current Status**: Frontend MVP (React + Vite) with Mock Data integration.

--

## 🚀 Key Features

- **🌐 Article to Quiz**: Paste any Wikipedia URL to auto-generate a 5-10 question quiz.
- **🎮 Interactive Mode**: Take the quiz in real-time with instant feedback (Correct/Wrong/Explanations).
- **🎨 Premium UI**: A clean, minimal, and responsive design system built with modern CSS.
- **📚 History Management**: View and revisit previously generated quizzes (Frontend UI implemented).
- **💡 Smart Suggestions**: Get recommended related topics for further learning.

---

## 🛠️ Tech Stack

- **Frontend**: React.js 19, Vite
- **Styling**: Vanilla CSS (Custom Design System with CSS Variables)
- **Icons**: Heroicons (SVG)

*(Planned Backend Stack)*
- **Backend API**: Python (FastAPI / Django)
- **Database**: PostgreSQL / MySQL
- **AI/LLM**: Google Gemini API / LangChain
- **Scraping**: BeautifulSoup4

---

## 📸 Screenshots

| Generate Quiz | Interactive Quiz |
|:---:|:---:|
| *Input a URL to start* | *Get instant feedback* |

_(Screenshots can be added here once captured)_

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BhanuPrakashAlahari/deepKlarity.git
   cd deepKlarity
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontEnd
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173` to see the app.

---

## 📂 Project Structure

```
deepKlarity/
├── frontEnd/              # React Application
│   ├── src/
│   │   ├── components/    # Reusable UI Components
│   │   │   ├── QuizCard.jsx
│   │   │   ├── QuizDisplay.jsx
│   │   │   ├── QuizGenerator.jsx
│   │   │   └── History.jsx
│   │   ├── index.css      # Global Design System (Variables, Reset)
│   │   ├── App.jsx        # Main Layout & Routing
│   │   └── mockData.js    # Simulation of Backward responses
│   └── index.html         # Entry point
└── README.md              # Project Documentation
```

## 🔮 Future Roadmap

- [ ] Build Python Backend (FastAPI).
- [ ] Integrate BeautifulSoup for live Wikipedia scraping.
- [ ] Connect Gemini/OpenAI API for real-time question generation.
- [ ] Connect PostgreSQL database to persist User History.
- [ ] Add User Authentication.

---

Made with ❤️ by Bhanu Prakash Alahari
