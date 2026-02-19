# AI Market Trend Forecaster
# AI-Powered Market Trend & Consumer Sentiment Forecaster – Backend

##  Overview

This is the backend service for the AI-Powered Market Trend & Consumer Sentiment Forecasting system.

The backend is built using **FastAPI** and follows a clean, modular architecture.  
It handles:

- Sentiment analysis
- Trend aggregation
- Alert detection
- RAG-based query processing
- Scheduled report generation
- MongoDB data storage

---

## 🛠 Tech Stack

- Python 3.10+
- FastAPI
- MongoDB
- Pydantic
- Uvicorn
- APScheduler (for background tasks)

---

## 🏗 Architecture

The backend follows a layered architecture:


---

## 🚀 Features

### 1️⃣ Sentiment Analysis
- Processes product reviews
- Classifies sentiment (positive / negative / neutral)
- Stores sentiment score in MongoDB

### 2️⃣ Trend Analysis
- Aggregates product-level sentiment
- Detects trending products using MongoDB aggregation pipeline

### 3️⃣ Alert Detection
- Triggers alerts when negative sentiment crosses threshold
- Scheduled background monitoring

### 4️⃣ RAG Module
- Uses LLM (via Ollama/OpenAI) for contextual query answering
- Retrieves relevant stored data before generating response

### 5️⃣ Scheduled Reports
- Automatic report generation using scheduler

---




