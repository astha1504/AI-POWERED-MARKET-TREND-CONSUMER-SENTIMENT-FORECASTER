import os
import requests
from dotenv import load_dotenv
from app.database import get_collection

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def analyze_sentiment(text):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    prompt = f"""
    Analyze the sentiment of this review.
    Return ONLY in this format:
    Positive, 0.8
    or
    Negative, -0.6
    or
    Neutral, 0.0
    Review: {text}
    """
    data = {
        "model":"nvidia/nemotron-3-super-120b-a12b:free",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    try:
        output = result["choices"][0]["message"]["content"]
        label, score = output.strip().split(",")
        return float(score.strip()), label.strip()
    except:
        return 0.0, "Neutral"

def process_all_sentiments():
    review_col = get_collection("cleaned_reviews")
    sentiment_col = get_collection("sentiment_results")
    sentiment_col.delete_many({})

    for review in review_col.find():
        score, label = analyze_sentiment(review["review"])
        sentiment_col.insert_one({
            "product": review["product"],
            "review": review["review"],
            "rating": review["rating"],
            "sentiment": label.lower(),
            "score": score
        })

    return {"message": "Sentiment analysis completed using Mistral LLM"}

def get_sentiment_results(limit: int = 200):
    col = get_collection("sentiment_results")
    cursor = col.find({}, {"_id": 0})
    if limit > 0:
        cursor = cursor.limit(limit)
    return list(cursor)