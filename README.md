# Crypto Vision

A monorepo application built with **Next.js** and **Django REST Framework (DRF)**.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript

### Backend
- Python
- Django
- Django REST Framework

## Project Structure

```text
crypto-vision/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Django REST API
│       ├── config/       # Django project configuration
│       ├── manage.py
│       └── .venv/        # Python virtual environment (not committed)
├── packages/             # Shared packages (optional)
├── infra/                # Infrastructure configuration
├── scripts/              # Development scripts
├── docs/                 # Project documentation
├── .env.example
├── .gitignore
├── compose.yaml
├── package.json
└── README.md
```

## Prerequisites

Make sure the following tools are installed:

- Node.js (LTS)
- npm
- Python 3
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd crypto-vision
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Set up the backend

```bash
cd apps/api

python3 -m venv .venv
source .venv/bin/activate

pip install django djangorestframework
pip freeze > requirements.txt
```

If the Django project has not been created yet, initialize it:

```bash
django-admin startproject config .
```

Return to the repository root:

```bash
cd ../..
```

### 4. Run database migrations

```bash
cd apps/api
source .venv/bin/activate
python manage.py migrate
```

### 5. Run the application

From the repository root:

```bash
npm run dev
```

This command starts both the frontend and backend concurrently.

## Development URLs

| Service | URL |
|---|---|
| Next.js | http://localhost:3000 |
| Django | http://localhost:8000 |
| Django Admin | http://localhost:8000/admin |

## Environment Variables

Create environment files based on `.env.example`.

Never commit secrets, API keys, or production credentials to version control.

## API

The backend exposes REST API endpoints through Django REST Framework.

Recommended API prefix:

```text
/api/v1/
```

## Git Workflow

- Create a separate branch for each feature or bug fix.
- Keep frontend and backend changes organized.
- Write tests for new functionality.
- Never commit environment files, virtual environments, or generated build files.

## License

Add a license here if the project will be publicly distributed.
