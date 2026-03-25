import pandas as pd
import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

df = pd.read_csv("clean_reviews.csv")

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
        "model": "mistralai/mistral-7b-instruct",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    try:
        output = result["choices"][0]["message"]["content"]
        label, score = output.split(",")
        return float(score.strip()), label.strip()
    except:
        return 0.0, "Neutral"

df[["sentiment_score", "sentiment_label"]] = df["review"].apply(
    lambda x: pd.Series(analyze_sentiment(x))
)

output_df = df[["product", "review", "rating", "sentiment_score", "sentiment_label"]]
output_df.to_csv("reviews_with_sentiment.csv", index=False)

print("Sentiment analysis completed.")
print("Output saved to reviews_with_sentiment.csv")