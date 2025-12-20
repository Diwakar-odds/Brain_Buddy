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
└── database/               # MongoDB models and configuration
```

## Setup

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure MongoDB Atlas

1. Create a free MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster (M0 free tier)
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from "Connect" → "Connect your application"

### 3. Set Environment Variables

```bash
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string
```

Example `.env`:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/brain_buddy?retryWrites=true&w=majority
```

## Run

```bash
# From backend directory
uvicorn api.main:app --reload

# Or using the main.py directly
python api/main.py
```

The API will be available at http://localhost:8000

## Test Connection

```bash
# Test MongoDB connection
python database/models.py

# Check API health
curl http://localhost:8000/health
```

## Documentation

- API docs: http://localhost:8000/docs (Swagger UI)
- Database schema: See `database/README.md`
