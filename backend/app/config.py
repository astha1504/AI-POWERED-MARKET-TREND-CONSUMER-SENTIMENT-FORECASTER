import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "market_forecaster"

# OLLAMA_URL = "http://localhost:11434/api/generate"
# OLLAMA_MODEL = "llama3"
