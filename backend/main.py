from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import QuizRequest, QuizResponse
from scraper import scrape_wikipedia
from quiz_generator import generate_quiz_from_text
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="WikiQuiz AI Backend")

# CORS setup to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "WikiQuiz AI Backend is running"}

@app.post("/generate-quiz", response_model=QuizResponse)
def generate_quiz(request: QuizRequest):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    if "wikipedia.org" not in request.url:
        raise HTTPException(status_code=400, detail="Only Wikipedia URLs are supported")

    # 1. Scrape Content
    scraped_data = scrape_wikipedia(request.url)
    if not scraped_data:
        raise HTTPException(status_code=500, detail="Failed to scrape content from the URL")

    # 2. Generate Quiz using Gemini
    try:
        quiz_data = generate_quiz_from_text(scraped_data['title'], scraped_data['content'], request.url)
        return quiz_data
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
