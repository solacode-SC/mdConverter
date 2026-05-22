import os
import shutil
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

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

MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024  # 2GB

@app.post("/convert")
async def convert_file(file: UploadFile = File(...)):
    # Check file size without reading into memory (check content-length if available)
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 2GB.")

    filename = file.filename.lower()
    ext = os.path.splitext(filename)[1]
    
    if ext not in [".pdf", ".docx", ".doc", ".pptx", ".ppt"]:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, Word, or PPT.")

    # Save to temporary file to avoid Out-Of-Memory (OOM) on large >1GB files
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        if ext == ".pdf":
            markdown_text = convert_pdf(tmp_path)
        elif ext in [".docx", ".doc"]:
            markdown_text = convert_docx(tmp_path)
        elif ext in [".pptx", ".ppt"]:
            markdown_text = convert_pptx(tmp_path)
            
        out_name = filename.rsplit(".", 1)[0] + ".md"
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
    finally:
        # Always clean up the temporary file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    return {
        "filename": out_name,
        "markdown": markdown_text
    }
