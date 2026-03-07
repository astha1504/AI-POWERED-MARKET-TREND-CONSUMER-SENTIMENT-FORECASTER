import pandas as pd
import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import re

# Download stopwords
nltk.download('stopwords')
from nltk.corpus import stopwords
stop_words = stopwords.words('english')

# Load dataset and remove duplicate reviews
df = pd.read_csv("clean_reviews.csv")
df = df.drop_duplicates(subset=["review"])
df.to_csv("clean_reviews.csv", index=False)
print("✅ Duplicates removed")

# Preprocess text
def preprocess(text):
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = [w for w in text.split() if w not in stop_words]
    return " ".join(tokens)

df["cleaned_review"] = df["review"].apply(preprocess)

# Convert text to document-term matrix
vectorizer = CountVectorizer(max_df=0.95, min_df=2)
dtm = vectorizer.fit_transform(df["cleaned_review"])

# Train LDA model
num_topics = 5
lda = LatentDirichletAllocation(n_components=num_topics, random_state=42)
topic_matrix = lda.fit_transform(dtm)

# Assign dominant topic
df["topic"] = topic_matrix.argmax(axis=1)

# Save results
df.to_csv("reviews_with_topics.csv", index=False)
print("✅ Topic modeling completed. Output saved to reviews_with_topics.csv")

# Optional: show top words per topic
feature_names = vectorizer.get_feature_names_out()
for i, topic in enumerate(lda.components_):
    top_words = [feature_names[j] for j in topic.argsort()[-5:]]
    print(f"Topic {i}: {top_words}")