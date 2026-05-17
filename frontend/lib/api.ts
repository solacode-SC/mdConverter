export async function convertFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const response = await fetch(`${API_URL}/convert`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Failed to convert file';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
