import fitz  # PyMuPDF

def convert_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    markdown_lines = []
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        if text.strip():
            markdown_lines.append(f"## Page {page_num + 1}\n\n{text}")
            
    return "\n\n".join(markdown_lines)
