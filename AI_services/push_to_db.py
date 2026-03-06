import pandas as pd
from app.database import get_collection

# Load your final processed CSV
df = pd.read_csv("reviews_final.csv")

# Get MongoDB collection
sentiment_collection = get_collection("sentiment_results")

# Optional: clear old AI results
sentiment_collection.delete_many({})

# Insert new AI results
sentiment_collection.insert_many(df.to_dict("records"))

print("✅ AI results successfully pushed to MongoDB (sentiment_results)")