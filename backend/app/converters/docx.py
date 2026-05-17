import mammoth
import io

def convert_docx(content: bytes) -> str:
    result = mammoth.convert_to_markdown(io.BytesIO(content))
    return result.value
