from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

from app.converters.pdf import convert_pdf
from app.converters.docx import convert_docx
from app.converters.pptx import convert_pptx

app = FastAPI(title="MD Converter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@app.post("/convert")
async def convert_file(file: UploadFile = File(...)):
    content = await file.read()
    
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 10MB.")
        
    filename = file.filename.lower()
    
    try:
        if filename.endswith(".pdf"):
            markdown_text = convert_pdf(content)
            out_name = file.filename.replace(".pdf", ".md")
        elif filename.endswith(".docx"):
            markdown_text = convert_docx(content)
            out_name = file.filename.replace(".docx", ".md")
        elif filename.endswith(".pptx"):
            markdown_text = convert_pptx(content)
            out_name = file.filename.replace(".pptx", ".md")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or PPTX.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

    return {
        "filename": out_name,
        "markdown": markdown_text
    }
