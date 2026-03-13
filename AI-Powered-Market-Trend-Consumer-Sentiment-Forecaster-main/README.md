# AI-Powered Market Trend & Consumer Sentiment Forecaster Analysis

## 📌 Project Overview

The **AI-Powered Market Trend & Consumer Sentiment Forecaster Analysis** project is designed to help businesses understand consumer opinions, emotions, and emerging trends from large volumes of online data.

The system collects data from multiple sources such as **e-commerce platforms (Amazon & Flipkart)**, **news APIs**, and **social media platforms**, then processes it using **data cleaning, sentiment analysis, and topic modeling techniques**. The final output provides actionable insights that can support marketing strategies, product improvements, and trend forecasting.

---

## 🎯 Objectives

- Analyze consumer sentiment (Positive / Negative / Neutral)
- Identify trending topics and patterns in customer feedback
- Reduce noisy and unstructured data for meaningful analysis
- Combine multi-source data into a unified dataset
- Support data-driven decision making

---

## 🛠️ Project Workflow

### Step 1: Data Cleaning (`cleaning.py`)
- Removes missing values, duplicates, and irrelevant records
- Standardizes text data (lowercasing, punctuation removal, etc.)
- Prepares raw data for reliable analysis

### Step 2: Data Merging
- Merges datasets collected from **Amazon** and **Flipkart**
- Ensures schema consistency across platforms
- Creates a unified dataset for analysis

### Step 3: Data Reduction
- Reduces the dataset size after merging
- Removes redundant or less relevant records
- Improves performance and efficiency of downstream models

### Step 4: Category Definition (`category.py`)
- Defines product categories (e.g., electronics, fashion, appliances)
- Assigns category labels to each record
- Helps in category-wise sentiment and trend analysis

### Step 5: Sentiment Analysis (`sentiment.py`)
- Assigns sentiment labels: **Positive, Negative, Neutral**
- Generates random timestamps for temporal trend analysis
- Prepares sentiment-ready data for visualization and modeling

### Step 6: Topic Modeling
- Applies topic modeling techniques (e.g., LDA / BERTopic)
- Identifies common themes and discussion topics
- Extracts insights such as complaints, praises, and feature mentions

---

## 🔌 API Integration

The project uses multiple APIs to enrich data sources:

- `news_api.py` – Fetches news articles related to products and brands
- `reddit.py` – Collects user discussions and opinions from Reddit
- `rapid.py` – Retrieves additional data using RapidAPI services

These APIs help capture real-world sentiment beyond e-commerce reviews.

---

## 🧰 Tech Stack

- **Programming Language:** Python
- **Libraries:** pandas, numpy, sklearn, transformers
- **NLP Techniques:** Sentiment Analysis, Topic Modeling
- **Data Sources:** Amazon, Flipkart, News APIs, Reddit
- **Development Tools:** VS Code, GitHub

---

## 📊 Output & Results

- Cleaned and structured consumer sentiment dataset
- Sentiment distribution across products and categories
- Topic-wise insights highlighting customer concerns and preferences
- Reduced and optimized dataset for faster analysis

---

## 🚀 Future Enhancements

- Real-time sentiment analysis
- Multilingual sentiment support
- Predictive trend forecasting
- Dashboard integration for visualization
- RAG and LLM-based contextual querying

---

## ✅ Conclusion

This project demonstrates how AI and NLP techniques can transform raw, unstructured consumer data into meaningful insights. By combining data cleaning, sentiment analysis, and topic modeling, the system enables organizations to better understand customers and respond proactively to market trends.

---



