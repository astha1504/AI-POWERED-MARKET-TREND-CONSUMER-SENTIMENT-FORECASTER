import pandas as pd

# Load CSVs
sentiment_df = pd.read_csv("reviews_with_sentiment.csv")
topics_df = pd.read_csv("reviews_with_topics.csv")

# Merge using review column
merged_df = pd.merge(
    sentiment_df,
    topics_df[["review", "topic"]],
    on="review",
    how="left"
)

# Remove duplicate topic columns if created
if "topic_x" in merged_df.columns:
    merged_df = merged_df.drop(columns=["topic_x"])
    merged_df = merged_df.rename(columns={"topic_y": "topic"})

# Save final dataset
merged_df.to_csv("reviews_final.csv", index=False)

print("Final dataset saved as reviews_final.csv")