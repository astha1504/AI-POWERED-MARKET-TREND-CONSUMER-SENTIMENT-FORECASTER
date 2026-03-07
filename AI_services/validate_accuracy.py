import pandas as pd

# Load final CSV (adjust path if your CSV is in project root)
df = pd.read_csv("reviews_final.csv")

# Map ratings to ground truth sentiment
def rating_to_sentiment(rating):
    if rating >= 4:
        return "Positive"
    elif rating <= 2:
        return "Negative"
    else:
        return "Neutral"

df["ground_truth"] = df["rating"].apply(rating_to_sentiment)

# Check correctness
df["correct"] = df["sentiment_label"] == df["ground_truth"]

# Calculate overall accuracy
accuracy_percent = df["correct"].mean() * 100
print(f"✅ Overall accuracy: {accuracy_percent:.2f}%")

# Add a summary row at the end
summary = {
    "product": "OVERALL ACCURACY",
    "review": "",
    "rating": "",
    "sentiment_score": "",
    "sentiment_label": "",
    "topic": df["topic"].iloc[0] if "topic" in df.columns else "",
    "ground_truth": "",
    "correct": f"{accuracy_percent:.2f}%"
}

df = pd.concat([df, pd.DataFrame([summary])], ignore_index=True)

# Save back to the same CSV
df.to_csv("reviews_final.csv", index=False)
print("✅ Accuracy added at the end of reviews_final.csv")