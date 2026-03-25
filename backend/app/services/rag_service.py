from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader
import os
import requests
from dotenv import load_dotenv

load_dotenv()

class RAGService:

    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
        self.db_path = "vector_store"
        if os.path.exists(self.db_path):
            self.vectorstore = FAISS.load_local(
                self.db_path,
                self.embeddings,
                allow_dangerous_deserialization=True
            )
        else:
            self.vectorstore = None

    def add_text(self, text: str):
        docs = self.text_splitter.split_text(text)
        if self.vectorstore is None:
            self.vectorstore = FAISS.from_texts(docs, self.embeddings)
        else:
            self.vectorstore.add_texts(docs)
        self.vectorstore.save_local(self.db_path)

    def add_pdf(self, file_path: str):
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        docs = self.text_splitter.split_documents(documents)
        if self.vectorstore is None:
            self.vectorstore = FAISS.from_documents(docs, self.embeddings)
        else:
            self.vectorstore.add_documents(docs)
        self.vectorstore.save_local(self.db_path)

    def query(self, query: str):
        if self.vectorstore is None:
            return "No knowledge base available."

        docs = self.vectorstore.similarity_search(query, k=3)
        context = "\n\n".join([doc.page_content for doc in docs])

        API_KEY = os.getenv("OPENROUTER_API_KEY")

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model":"nvidia/nemotron-3-super-120b-a12b:free",
                "messages": [
                    {
                        "role": "system",
                        "content": "Answer briefly using the context. Do NOT dump full data. Give a short, clear answer."
                    },
                    {
                        "role": "user",
                        "content": f"""Use the context below to answer the question.
Do NOT include full reviews or raw data.
Summarize only the key insight.

Context:
{context[:1000]}

Question:
{query}

Answer:"""
                    }
                ]
            }
        )

        result = response.json()
        try:
            return result["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"LLM Error: {e}")
            print(f"API Response: {result}")
            return context