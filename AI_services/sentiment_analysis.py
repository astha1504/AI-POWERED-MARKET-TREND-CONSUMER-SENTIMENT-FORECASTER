import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

sia = SentimentIntensityAnalyzer()

# Load dataset
df = pd.read_csv("clean_reviews.csv")

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
df[["sentiment_score", "sentiment_label"]] = df["review"].apply(
    lambda x: pd.Series(get_sentiment(x))
)

# Output columns
output_df = df[[
    "product",
    "review",
    "rating",
    "sentiment_score",
    "sentiment_label"
]]

# Save result
output_df.to_csv("reviews_with_sentiment.csv", index=False)

print("Sentiment analysis completed.")
print("Output saved to reviews_with_sentiment.csv")