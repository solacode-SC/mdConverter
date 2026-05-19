<div align="center">
  
  # 📝 MD Converter
  
  **Transform your documents into clean Markdown instantly.**

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

</div>

<br/>

## ✨ Overview

**MD Converter** is a free, no-auth document converter that transforms PDF, DOCX, and PPTX files directly into clean Markdown (`.md`). Designed with a seamless, SaaS-like user experience, it operates entirely statelessly—no signups, no databases, just pure conversion power.

Simply drag and drop your file, convert, and instantly copy or download your formatted Markdown text.

---

## 🚀 Key Features

- **Multi-Format Support:** Automatically detects and converts PDF, Word (`.docx`), and PowerPoint (`.pptx`) files.
- **Lightning Fast:** Stateless FastAPI backend parses documents rapidly without any database overhead.
- **Beautiful UI:** A premium, "iLovePDF meets Claude AI" aesthetic featuring clean layouts, smooth transitions, and a drag-and-drop zone.
- **No Authentication:** 100% free to use immediately. No logins, no user tracking.
- **Containerized:** Fully Dockerized environment for one-click booting and cross-platform compatibility.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **Components:** `react-dropzone` for robust file uploading

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Parsers:** 
  - `PyMuPDF` (PDF text extraction)
  - `mammoth` (DOCX to Markdown)
  - `python-pptx` (Slide text extraction)

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Tooling:** Comprehensive `Makefile` for developer workflows

---

## 🏁 Quick Start

### Prerequisites
Make sure you have [Docker](https://www.docker.com/get-started) and [Make](https://www.gnu.org/software/make/) installed on your machine.

### Installation & Running
Start the production stack (Frontend + Backend) with:

```bash
make up
```

For local development with hot reload:

```bash
make dev
```

Once the containers are running, the application will be available at:
👉 **[http://localhost:3000](http://localhost:3000)**

*(The backend API runs concurrently on [http://localhost:8000](http://localhost:8000))*

You can configure the frontend API base URL by setting `NEXT_PUBLIC_API_URL`.

---

## 🧰 Makefile Commands

We provide a developer-friendly CLI wrapper. Just run these commands from the project root:

| Command | Description |
|---|---|
| `make help` | Shows all available commands. |
| `make dev` | Starts the development environment with hot reload. |
| `make up` | Starts production in detached mode (builds if necessary). |
| `make prod` | Alias for production startup. |
| `make down` | Stops all running MD Converter containers. |
| `make status` | Shows the active status of the containers. |
| `make restart` | Restarts the containers without rebuilding. |
| `make rebuild` | Forces a fresh build and recreation of the containers. |
| `make logs` | Streams the logs from both frontend and backend. |
| `make clean` | Tears down containers, removes volumes, and prunes unused images. |
| `make reset` | Performs a full clean and completely rebuilds the app. |

---

## 📁 Project Structure

```text
md-converter/
├── frontend/             # Next.js 14 App
│   ├── app/              # Next.js App Router (pages & global styles)
│   ├── components/       # Reusable React components (UploadBox, MarkdownPreview)
│   ├── lib/              # API utilities
│   └── Dockerfile
├── backend/              # FastAPI Application
│   ├── app/
│   │   ├── converters/   # Conversion logic (pdf.py, docx.py, pptx.py)
│   │   └── main.py       # FastAPI entrypoint & router
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml    # Production compose
├── docker-compose.dev.yml # Development compose
└── Makefile              # Developer command shortcuts
```

---

<div align="center">
  <i>Built for simplicity and speed. ⚡</i>
</div>
