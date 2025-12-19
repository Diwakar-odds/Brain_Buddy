"""
Brain Buddy Backend API
Main FastAPI application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Import routers (to be created)
# from api.routes import users, sessions, movers, brainwave, pfc_gym

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("🧠 Brain Buddy API starting...")
    # TODO: Initialize database connection
    # TODO: Load pre-trained AI models
    yield
    # Shutdown
    print("🧠 Brain Buddy API shutting down...")
    # TODO: Close database connections
    # TODO: Save model states

app = FastAPI(
    title="Brain Buddy API",
    description="AI-powered neuroplasticity training platform",
    version="0.1.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
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
    return {
        "status": "healthy",
        "database": "connected",  # TODO: Actual DB check
        "ai_models": "loaded"      # TODO: Actual model check
    }

# TODO: Include routers
# app.include_router(users.router, prefix="/api/users", tags=["users"])
# app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
# app.include_router(movers.router, prefix="/api/movers", tags=["movers"])
# app.include_router(brainwave.router, prefix="/api/brainwave", tags=["brainwave"])
# app.include_router(pfc_gym.router, prefix="/api/pfc-gym", tags=["pfc-gym"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
