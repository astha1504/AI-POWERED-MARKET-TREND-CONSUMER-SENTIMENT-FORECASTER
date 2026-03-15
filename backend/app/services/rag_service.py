# from app.rag.rag_pipeline import ask_question

# def get_rag_answer(query: str):
#     answer = ask_question(query)

#     return {"query": query, "answer": answer}

#     return {"query": query, "answer": answer}
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader, TextLoader
import os


class RAGService:

    def __init__(self):

        # Embedding model
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        # Text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )

        # Vector DB path
        self.db_path = "vector_store"

        # Load existing FAISS index if available
        if os.path.exists(self.db_path):
            self.vectorstore = FAISS.load_local(
                self.db_path,
                self.embeddings,
                allow_dangerous_deserialization=True
            )
        else:
            self.vectorstore = None

    # -------- DOCUMENT INGESTION --------

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

    # -------- QUERY --------

    def query(self, query: str):

        if self.vectorstore is None:
            return "No knowledge base available."

        docs = self.vectorstore.similarity_search(query, k=3)

        context = "\n\n".join([doc.page_content for doc in docs])

        return context
