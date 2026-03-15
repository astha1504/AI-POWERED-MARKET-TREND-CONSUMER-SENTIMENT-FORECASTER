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
import os

router = APIRouter(prefix="/rag", tags=["RAG"])

rag = RAGService()


class QueryRequest(BaseModel):
    query: str


@router.post("/upload-text")
async def upload_text(file: UploadFile = File(...)):

    content = await file.read()
    text = content.decode("utf-8")

    rag.add_text(text)

    return {"message": "Text document added to RAG"}


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    rag.add_pdf(file_path)

    os.remove(file_path)

    return {"message": "PDF added to RAG"}


@router.post("/query")
def query_rag(request: QueryRequest):

    result = rag.query(request.query)

    return {
        "query": request.query,
        "context": result
    }
