"""
Database Configuration for MongoDB
Beanie ODM models and database setup
"""

from beanie import Document, Link, init_beanie
from pydantic import Field, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB URL from environment
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "brain_buddy"

# Global client variable
mongo_client: Optional[AsyncIOMotorClient] = None


# Models

class User(Document):
    """User account"""
    email: EmailStr = Field(unique=True)
    hashed_password: str
    chronotype: Optional[str] = None  # lion, bear, wolf, dolphin
    created_at: datetime = Field(default_factory=datetime.utcnow)
    privacy_settings: Dict[str, Any] = Field(default_factory=dict)
    
    class Settings:
        name = "users"
        indexes = [
            "email",
        ]


class TrainingSession(Document):
    """Individual training session"""
    user_id: str  # Reference to User
    module_type: str  # movers, pfc_gym, mental_rehearsal, brainwave
    brainwave_target: Optional[str] = None  # alpha, beta, theta, delta, gamma
    generated_content: Dict[str, Any] = Field(default_factory=dict)  # Music parameters, script, etc.
    user_rating: Optional[int] = None  # 1-5
    effectiveness_score: Optional[float] = None  # 0-1
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    duration_seconds: Optional[int] = None
    
    class Settings:
        name = "sessions"
        indexes = [
            "user_id",
            "module_type",
            "timestamp",
        ]


class BrainKnowledge(Document):
    """Scientific knowledge base"""
    stimulus_type: str  # binaural_beats, visualization, breathwork
    stimulus_parameters: Dict[str, Any] = Field(default_factory=dict)
    outcome: str  # increased_focus, reduced_anxiety
    evidence_strength: float  # 0-1 from meta-analysis
    citations: List[Dict[str, str]] = Field(default_factory=list)  # Array of paper references
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "brain_knowledge"
        indexes = [
            "stimulus_type",
            "outcome",
        ]


class UserModel(Document):
    """User's personalized AI model weights (encrypted)"""
    user_id: str = Field(unique=True)  # Reference to User
    model_weights: str  # Encrypted blob or file path
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    training_steps: int = Field(default=0)
    phase: str = Field(default="developmental")  # developmental or adaptive
    
    class Settings:
        name = "user_models"
        indexes = [
            "user_id",
        ]


class Habit(Document):
    """User's habit tracking for PFC Gym"""
    user_id: str  # Reference to User
    habit_type: str  # negative_loop, positive_routine
    trigger: str
    routine: str
    reward: str
    interrupt_protocol: Dict[str, Any] = Field(default_factory=dict)
    success_count: int = Field(default=0)
    attempt_count: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "habits"
        indexes = [
            "user_id",
            "habit_type",
        ]


# Database initialization functions

async def init_db():
    """Initialize MongoDB connection and Beanie"""
    global mongo_client
    
    try:
        # Create Motor client
        mongo_client = AsyncIOMotorClient(MONGODB_URL)
        
        # Get database
        database = mongo_client[DATABASE_NAME]
        
        # Initialize Beanie with document models
        await init_beanie(
            database=database,
            document_models=[
                User,
                TrainingSession,
                BrainKnowledge,
                UserModel,
                Habit,
            ]
        )
        
        print(f"✅ Connected to MongoDB: {DATABASE_NAME}")
        print(f"✅ Initialized Beanie with {len([User, TrainingSession, BrainKnowledge, UserModel, Habit])} document models")
        
    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        raise


async def close_db():
    """Close MongoDB connection"""
    global mongo_client
    
    if mongo_client:
        mongo_client.close()
        print("✅ MongoDB connection closed")


async def get_db_status() -> Dict[str, Any]:
    """Get database connection status"""
    global mongo_client
    
    if not mongo_client:
        return {"status": "disconnected", "database": None}
    
    try:
        # Ping the database
        await mongo_client.admin.command('ping')
        return {
            "status": "connected",
            "database": DATABASE_NAME,
            "url": MONGODB_URL.split('@')[-1] if '@' in MONGODB_URL else "localhost"
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }


if __name__ == "__main__":
    import asyncio
    
    async def test_connection():
        """Test MongoDB connection"""
        await init_db()
        status = await get_db_status()
        print(f"Database status: {status}")
        await close_db()
    
    asyncio.run(test_connection())
