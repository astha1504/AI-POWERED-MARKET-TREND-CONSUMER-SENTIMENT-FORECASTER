from fastapi import APIRouter
from app.services.sentiment_service import process_all_sentiments
from app.database import get_collection

router = APIRouter(prefix="/sentiment", tags=["Sentiment"])

@router.post("/analyze")
def analyze():
    return process_all_sentiments()

@router.get("/results")
def get_results(limit: int = 200):
    col = get_collection("sentiment_results")
    cursor = col.find({}, {"_id": 0})
    if limit > 0:
        cursor = cursor.limit(limit)
    return list(cursor)