"""
Brain Buddy Backend API
Main FastAPI application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Import database functions
from database.models import init_db, close_db, get_db_status

# Import routers
from api.routes import sessions, knowledge

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("🧠 Brain Buddy API starting...")
    try:
        await init_db()
        print("✅ Database initialized")
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
    # TODO: Load pre-trained AI models
    
    yield
    
    # Shutdown
    print("🧠 Brain Buddy API shutting down...")
    await close_db()
    # TODO: Save model states

app = FastAPI(
    title="Brain Buddy API",
    description="AI-powered neuroplasticity training platform",
    version="0.1.0",
    lifespan=lifespan
)

# CORS middleware - Allow frontend from environment variable
allowed_origins = [
    "http://localhost:5173",  # Local development
    os.getenv("FRONTEND_URL", "http://localhost:5173")  # Production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "Brain Buddy API is running",
        "version": "0.1.0"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    db_status = await get_db_status()
    
    return {
        "status": "healthy" if db_status["status"] == "connected" else "degraded",
        "database": db_status,
        "ai_models": "not_loaded"  # TODO: Actual model check
    }

# Include API routers
app.include_router(sessions.router, prefix="/api/sessions", tags=["Training Sessions"])
app.include_router(knowledge.router, prefix="/api/knowledge", tags=["Brain Knowledge"])

# TODO: Additional routers
# app.include_router(users.router, prefix="/api/users", tags=["users"])
# app.include_router(movers.router, prefix="/api/movers", tags=["movers"])
# app.include_router(brainwave.router, prefix="/api/brainwave", tags=["brainwave"])
# app.include_router(pfc_gym.router, prefix="/api/pfc-gym", tags=["pfc-gym"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
