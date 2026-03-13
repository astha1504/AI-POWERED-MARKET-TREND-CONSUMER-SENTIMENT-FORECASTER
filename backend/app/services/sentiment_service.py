from app.database import get_collection

def simple_sentiment_analysis(text):
    text = text.lower()

    negative_words = ["bad", "poor", "worst", "slow", "hate"]
    positive_words = ["good", "great", "excellent", "love", "fast"]

    score = 0

    for word in negative_words:
        if word in text:
            score -= 1

    for word in positive_words:
        if word in text:
            score += 1

    sentiment = "positive" if score > 0 else "negative"

    return {
        "sentiment": sentiment,
        "score": score
    }


def process_all_sentiments():
    review_col = get_collection("cleaned_reviews")
    sentiment_col = get_collection("sentiment_results")

    sentiment_col.delete_many({})

    for review in review_col.find():
        result = simple_sentiment_analysis(review["review"])

        sentiment_col.insert_one({
            "product": review["product"],
            "review": review["review"],
            "rating": review["rating"],
            "sentiment": result["sentiment"],
            "score": result["score"]
        })

    return {"message": "Sentiment analysis completed"}
