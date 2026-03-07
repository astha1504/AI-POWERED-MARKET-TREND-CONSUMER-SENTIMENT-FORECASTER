import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

# Load dataset and remove duplicate reviews
df = pd.read_csv("clean_reviews.csv")
df = df.drop_duplicates(subset=["review"])
df.to_csv("clean_reviews.csv", index=False)
print("✅ Duplicates removed")

# Sentiment function
def get_sentiment(text):
    score = sia.polarity_scores(str(text))["compound"]
    if score >= 0.05:
        label = "Positive"
    elif score <= -0.05:
        label = "Negative"
    else:
        label = "Neutral"
    return score, label

# Apply sentiment
df[["sentiment_score", "sentiment_label"]] = df["review"].apply(lambda x: pd.Series(get_sentiment(x)))

# Save output
df[["product","review","rating","sentiment_score","sentiment_label"]].to_csv("reviews_with_sentiment.csv", index=False)
print("Sentiment analysis completed")