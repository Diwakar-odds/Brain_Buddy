"""
Database Configuration
SQLAlchemy models and database setup
"""

from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost/brain_buddy")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Models

class User(Base):
    """User account"""
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    chronotype = Column(String)  # lion, bear, wolf, dolphin
    created_at = Column(DateTime, default=datetime.utcnow)
    privacy_settings = Column(JSON, default={})
    
    # Relationships
    sessions = relationship("TrainingSession", back_populates="user")
    model_weights = relationship("UserModel", back_populates="user", uselist=False)


class TrainingSession(Base):
    """Individual training session"""
    __tablename__ = "sessions"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    module_type = Column(String)  # movers, pfc_gym, mental_rehearsal, brainwave
    brainwave_target = Column(String)  # alpha, beta, theta, delta, gamma
    generated_content = Column(JSON)  # Music parameters, script, etc.
    user_rating = Column(Integer)  # 1-5
    effectiveness_score = Column(Float)  # 0-1
    timestamp = Column(DateTime, default=datetime.utcnow)
    duration_seconds = Column(Integer)
    
    # Relationships
    user = relationship("User", back_populates="sessions")


class BrainKnowledge(Base):
    """Scientific knowledge base"""
    __tablename__ = "brain_knowledge"
    
    id = Column(String, primary_key=True)
    stimulus_type = Column(String)  # binaural_beats, visualization, breathwork
    stimulus_parameters = Column(JSON)
    outcome = Column(String)  # increased_focus, reduced_anxiety
    evidence_strength = Column(Float)  # 0-1 from meta-analysis
    citations = Column(JSON)  # Array of paper references
    created_at = Column(DateTime, default=datetime.utcnow)


class UserModel(Base):
    """User's personalized AI model weights (encrypted)"""
    __tablename__ = "user_models"
    
    user_id = Column(String, ForeignKey("users.id"), primary_key=True)
    model_weights = Column(String)  # Encrypted blob or file path
    last_updated = Column(DateTime, default=datetime.utcnow)
    training_steps = Column(Integer, default=0)
    phase = Column(String, default="developmental")  # developmental or adaptive
    
    # Relationships
    user = relationship("User", back_populates="model_weights")


class Habit(Base):
    """User's habit tracking for PFC Gym"""
    __tablename__ = "habits"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    habit_type = Column(String)  # negative_loop, positive_routine
    trigger = Column(String)
    routine = Column(String)
    reward = Column(String)
    interrupt_protocol = Column(JSON)
    success_count = Column(Integer, default=0)
    attempt_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


# Database initialization
def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")


def get_db():
    """Dependency for FastAPI routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
