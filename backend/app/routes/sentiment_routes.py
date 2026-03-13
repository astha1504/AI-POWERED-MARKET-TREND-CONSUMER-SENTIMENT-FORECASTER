from fastapi import APIRouter
from app.services.sentiment_service import process_all_sentiments

router = APIRouter(prefix="/sentiment", tags=["Sentiment"])

@router.post("/analyze")
def analyze():
    return process_all_sentiments()
