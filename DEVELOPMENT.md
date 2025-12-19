# Brain Buddy - Development Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+ (or SQLite for development)
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Initialize database**
```bash
python -m database.models
```

6. **Run development server**
```bash
uvicorn api.main:app --reload
```

Backend will be available at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### Frontend Setup

1. **Install dependencies**
```bash
npm install
```

2. **Run development server**
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for complete directory tree.

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
npm test
```

## 📚 Documentation

- **Research Foundation**: [RESEARCH_FOUNDATION.md](./RESEARCH_FOUNDATION.md)
- **Deep Research**: [DEEP_RESEARCH_THOUGHTS.md](./DEEP_RESEARCH_THOUGHTS.md)
- **Implementation Plan**: [implementation_plan.md](./brain/e76deda3-6039-4764-a0d6-c48a3485760a/implementation_plan.md)
- **Task Tracking**: [task.md](./brain/e76deda3-6039-4764-a0d6-c48a3485760a/task.md)

## 🔧 Development Workflow

### 1. Backend Development
- AI models in `backend/ai/`
- API routes in `backend/api/routes/`
- Database models in `backend/database/`

### 2. Frontend Development
- Components in `frontend/components/`
- Feature modules in `frontend/modules/`
- Pages in `frontend/pages/`

### 3. Testing
- Write tests alongside features
- Run tests before committing
- Maintain >80% coverage

## 🎯 Current Phase: MVP Development

### Completed ✅
- Research & documentation
- Project structure
- Backend framework (FastAPI)
- OCL-PDS continual learning engine
- Music generation module
- Database models

### In Progress 🔄
- API routes
- Frontend modules
- Database migrations

### Next Steps ⏳
- MOVERS ritual implementation
- Brainwave training interface
- User authentication
- Frontend-backend integration

## 🤝 Contributing

1. Create feature branch
2. Implement changes
3. Write tests
4. Update documentation
5. Submit PR

## 📝 Code Style

### Python
- Follow PEP 8
- Use type hints
- Docstrings for all functions

### TypeScript/React
- Follow ESLint rules
- Use functional components
- TypeScript for all files

## 🐛 Debugging

### Backend
```bash
# Verbose logging
LOG_LEVEL=DEBUG uvicorn api.main:app --reload

# Python debugger
import pdb; pdb.set_trace()
```

### Frontend
```bash
# React DevTools
# Browser console
```

## 🔐 Security

- Never commit `.env` files
- Use environment variables for secrets
- Encrypt sensitive data
- Follow OWASP guidelines

## 📊 Monitoring

- API logs in `backend/logs/`
- Performance metrics via `/health` endpoint
- User analytics (privacy-preserving)

## 🚢 Deployment

See deployment guide (coming soon) for production setup.

---

**Questions?** Check the documentation or create an issue.
