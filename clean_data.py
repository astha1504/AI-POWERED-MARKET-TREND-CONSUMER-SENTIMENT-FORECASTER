import pandas as pd

# load dataset
df = pd.read_csv("dataset.csv")

print("Original shape:", df.shape)

# keep only useful columns
df = df[['name','reviews.text','reviews.rating']]

# rename columns
df.columns = ['product','review','rating']

# remove null values
df = df.dropna()

# remove duplicates
df = df.drop_duplicates()

print("Cleaned shape:", df.shape)

# save cleaned dataset
df.to_csv("clean_reviews.csv", index=False)

print("Cleaned dataset saved successfully")