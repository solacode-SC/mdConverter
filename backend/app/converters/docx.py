import mammoth

def convert_docx(file_path: str) -> str:
    with open(file_path, "rb") as docx_file:
        result = mammoth.convert_to_markdown(docx_file)
        return result.value
