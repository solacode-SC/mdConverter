import fitz  # PyMuPDF

def convert_pdf(content: bytes) -> str:
    doc = fitz.open(stream=content, filetype="pdf")
    markdown_lines = []
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        if text.strip():
            markdown_lines.append(f"## Page {page_num + 1}\n\n{text}")
            
    return "\n\n".join(markdown_lines)
