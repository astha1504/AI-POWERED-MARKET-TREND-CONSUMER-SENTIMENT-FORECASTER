# from fastapi import APIRouter
# from app.rag.rag_pipeline import ask_question

# router = APIRouter(prefix="/rag", tags=["RAG"])

# @router.get("/")
# def ask(query: str):
#     return {"answer": ask_question(query)}
# from fastapi import APIRouter
# from app.rag.rag_pipeline import ask_question

# router = APIRouter(prefix="/rag", tags=["RAG"])

# @router.get("/")
# def ask(query: str):
#     return {"answer": ask_question(query)}

from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from app.services.rag_service import RAGService

router = APIRouter(prefix="/rag", tags=["RAG"])

rag_service = RAGService()


class QueryRequest(BaseModel):
    query: str


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a document to build the RAG knowledge base
    """
    content = await file.read()
    text = content.decode("utf-8")

    rag_service.add_documents(text)

    return {"message": "Document added to knowledge base"}


@router.post("/query")
def query_rag(request: QueryRequest):
    """
    Ask questions from uploaded documents
    """
    response = rag_service.query(request.query)

    return {
        "query": request.query,
        "response": response
    }
