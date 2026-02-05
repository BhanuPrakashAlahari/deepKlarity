# WikiQuiz AI - Automated Quiz Generator

WikiQuiz AI is a full-stack web application designed to automatically generate educational quizzes from any Wikipedia article. By leveraging Large Language Models (LLM) and web scraping technologies, the platform transforms unstructured text into structured, interactive assessments.

The system features a dual-mode interface:
1. **Generator Core**: Scrapes Wikipedia articles, processes content via Google Gemini AI, and generates structured quizzes with varying difficulty levels.
2. **History & Persistence**: Stores all generated quizzes in a PostgreSQL database, allowing users to review past content and track learning progress.

## Architecture Guidelines

The application follows a decoupled client-server architecture:

- **Frontend**: A React-based SPA (Single Page Application) optimized for performance and specialized interaction states (Study vs. Test modes).
- **Backend API**: A FastAPI (Python) service handling business logic, web scraping, AI integration, and database orchestration.
- **Database**: PostgreSQL relational database for structured data persistence.

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.9+)
- **Database ORM**: SQLAlchemy
- **Database**: PostgreSQL
- **AI/LLM**: LangChain + Google Gemini Pro
- **Scraping**: BeautifulSoup4
- **Validation**: Pydantic

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (Scoped & Modular)
- **State Management**: React Hooks

## Functional Specifications

### 1. Quiz Generation Module
- **Input**: Valid Wikipedia URL (e.g., `https://en.wikipedia.org/wiki/Quantum_computing`).
- **Process**:
  1. Validates the URL domain.
  2. Extracts main content, stripping metadata and references.
  3. Chunking logic to handle token limits.
  4. Generates 5-10 multiple-choice questions via LLM.
- **Output**: JSON payload containing questions, options, correct answers, explanations, and difficulty ratings.

### 2. Interaction Modes
- **Study Mode**: Real-time feedback. Users see the correct answer and explanation immediately after selection.
- **Test Mode**: Simulation of an exam environment. Answers are hidden until final submission, followed by a scored result.

### 3. Historical Data
- All generated quizzes are automatically persisted.
- Users can browse previous sessions, view metadata (title, URL, generation date), and retake quizzes.

## Installation & Setup

### Prerequisites
- Python 3.9 or higher
- Node.js 16 or higher
- PostgreSQL Database
- Google AI API Key (Gemini)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   Create a `.env` file in the `backend` directory:
   ```ini
   GOOGLE_API_KEY=your_gemini_api_key_here
   DATABASE_URL=postgresql://user:password@localhost/wikiquiz
   ```

5. Run the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000`. Swagger documentation is available at `/docs`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Database Schema

The persistent storage is designed with a normalized relational schema:

**Table: quizzes**
- `id` (Primary Key, Integer)
- `url` (String): Source URL of the article.
- `title` (String): Parsed title of the Wikipedia page.
- `summary` (Text): Brief abstract of the content.
- `quiz_data` (JSON): The structural payload of questions and answers.
- `created_at` (Timestamp): Record creation time.

## API Documentation

### POST /generate-quiz
Generates a new quiz from a URL.
- **Payload**: `{"url": "string"}`
- **Response**: Quiz Object (JSON)

### GET /history
Retrieves the list of previously generated quizzes.
- **Response**: Array of Quiz Objects (Summary view)

## Deployment

For production deployment:
1. **Backend**: Use Gunicorn as a process manager behind Nginx.
2. **Frontend**: Build static assets using `npm run build` and serve via Nginx/Apache or S3/CloudFront.
3. **Database**: Use a managed PostgreSQL instance (e.g., AWS RDS, DigitalOcean).

## License

Proprietary Software. All rights reserved.
