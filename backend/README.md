# Brain Buddy Backend

AI-powered brain training backend with continual learning and generative models.

## Structure

```
backend/
├── ai/                     # AI models and training
│   ├── continual_learning/ # OCL-PDS framework
│   ├── generative/         # Music & script generation
│   └── cognitive_model/    # Dual-process brain model
├── api/                    # FastAPI endpoints
├── data/                   # Data pipeline
└── database/               # Models and migrations
```

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn api.main:app --reload
```
