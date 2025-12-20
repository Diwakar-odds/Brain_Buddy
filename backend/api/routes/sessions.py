"""
Training Sessions API Routes
Endpoints for managing and retrieving training sessions
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel

from database.models import TrainingSession

router = APIRouter()


class TrainingSessionResponse(BaseModel):
    """Response model for training sessions"""
    id: str
    user_id: str
    module_type: str
    brainwave_target: Optional[str] = None
    generated_content: dict
    user_rating: Optional[int] = None
    effectiveness_score: Optional[float] = None
    timestamp: datetime
    duration_seconds: Optional[int] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class SessionStats(BaseModel):
    """Statistics about user's training sessions"""
    total_sessions: int
    total_hours: float
    average_rating: float
    sessions_by_module: dict
    sessions_by_brainwave: dict
    recent_sessions: int  # Last 7 days


@router.get("/", response_model=List[TrainingSessionResponse])
async def get_training_sessions(
    user_id: Optional[str] = Query(None, description="Filter by user ID"),
    module_type: Optional[str] = Query(None, description="Filter by module type (movers, pfc_gym, mental_rehearsal, brainwave)"),
    brainwave_target: Optional[str] = Query(None, description="Filter by brainwave target (delta, theta, alpha, beta, gamma)"),
    days: Optional[int] = Query(None, description="Only return sessions from last N days"),
    limit: int = Query(100, ge=1, le=500, description="Maximum number of sessions to return"),
    skip: int = Query(0, ge=0, description="Number of sessions to skip")
):
    """
    Retrieve training sessions with optional filters
    
    - **user_id**: Filter by specific user
    - **module_type**: Filter by training module
    - **brainwave_target**: Filter by target brainwave state
    - **days**: Only return sessions from last N days
    - **limit**: Maximum results (default 100, max 500)
    - **skip**: Pagination offset
    """
    query = {}
    
    if user_id:
        query["user_id"] = user_id
    
    if module_type:
        if module_type not in ["movers", "pfc_gym", "mental_rehearsal", "brainwave"]:
            raise HTTPException(status_code=400, detail="Invalid module_type")
        query["module_type"] = module_type
    
    if brainwave_target:
        if brainwave_target not in ["delta", "theta", "alpha", "beta", "gamma"]:
            raise HTTPException(status_code=400, detail="Invalid brainwave_target")
        query["brainwave_target"] = brainwave_target
    
    if days:
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        query["timestamp"] = {"$gte": cutoff_date}
    
    # Execute query
    sessions = await TrainingSession.find(query).sort("-timestamp").skip(skip).limit(limit).to_list()
    
    # Convert to response model
    return [
        TrainingSessionResponse(
            id=str(session.id),
            user_id=session.user_id,
            module_type=session.module_type,
            brainwave_target=session.brainwave_target,
            generated_content=session.generated_content,
            user_rating=session.user_rating,
            effectiveness_score=session.effectiveness_score,
            timestamp=session.timestamp,
            duration_seconds=session.duration_seconds
        )
        for session in sessions
    ]


@router.get("/stats", response_model=SessionStats)
async def get_session_statistics(
    user_id: str = Query(..., description="User ID to get statistics for"),
    days: Optional[int] = Query(None, description="Only include sessions from last N days")
):
    """
    Get comprehensive statistics about a user's training sessions
    
    - **user_id**: User to get stats for (required)
    - **days**: Only include sessions from last N days
    """
    query = {"user_id": user_id}
    
    if days:
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        query["timestamp"] = {"$gte": cutoff_date}
    
    # Get all sessions for user
    sessions = await TrainingSession.find(query).to_list()
    
    if not sessions:
        return SessionStats(
            total_sessions=0,
            total_hours=0.0,
            average_rating=0.0,
            sessions_by_module={},
            sessions_by_brainwave={},
            recent_sessions=0
        )
    
    # Calculate statistics
    total_seconds = sum(s.duration_seconds or 0 for s in sessions)
    total_hours = round(total_seconds / 3600, 2)
    
    ratings = [s.user_rating for s in sessions if s.user_rating is not None]
    average_rating = round(sum(ratings) / len(ratings), 2) if ratings else 0.0
    
    # Count by module type
    sessions_by_module = {}
    for session in sessions:
        module = session.module_type
        sessions_by_module[module] = sessions_by_module.get(module, 0) + 1
    
    # Count by brainwave target
    sessions_by_brainwave = {}
    for session in sessions:
        if session.brainwave_target:
            target = session.brainwave_target
            sessions_by_brainwave[target] = sessions_by_brainwave.get(target, 0) + 1
    
    # Count recent sessions (last 7 days)
    recent_cutoff = datetime.utcnow() - timedelta(days=7)
    recent_sessions = sum(1 for s in sessions if s.timestamp >= recent_cutoff)
    
    return SessionStats(
        total_sessions=len(sessions),
        total_hours=total_hours,
        average_rating=average_rating,
        sessions_by_module=sessions_by_module,
        sessions_by_brainwave=sessions_by_brainwave,
        recent_sessions=recent_sessions
    )


@router.get("/{session_id}", response_model=TrainingSessionResponse)
async def get_session_by_id(session_id: str):
    """
    Get a specific training session by ID
    
    - **session_id**: MongoDB ObjectId of the session
    """
    session = await TrainingSession.get(session_id)
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return TrainingSessionResponse(
        id=str(session.id),
        user_id=session.user_id,
        module_type=session.module_type,
        brainwave_target=session.brainwave_target,
        generated_content=session.generated_content,
        user_rating=session.user_rating,
        effectiveness_score=session.effectiveness_score,
        timestamp=session.timestamp,
        duration_seconds=session.duration_seconds
    )


@router.post("/", response_model=TrainingSessionResponse)
async def create_training_session(
    user_id: str,
    module_type: str,
    brainwave_target: Optional[str] = None,
    generated_content: dict = {},
    duration_seconds: Optional[int] = None
):
    """
    Create a new training session
    
    - **user_id**: User performing the session
    - **module_type**: Type of training module
    - **brainwave_target**: Target brainwave state (for brainwave module)
    - **generated_content**: Module-specific generated content
    - **duration_seconds**: Session duration
    """
    if module_type not in ["movers", "pfc_gym", "mental_rehearsal", "brainwave"]:
        raise HTTPException(status_code=400, detail="Invalid module_type")
    
    if module_type == "brainwave" and not brainwave_target:
        raise HTTPException(status_code=400, detail="brainwave_target required for brainwave module")
    
    session = TrainingSession(
        user_id=user_id,
        module_type=module_type,
        brainwave_target=brainwave_target,
        generated_content=generated_content,
        duration_seconds=duration_seconds
    )
    
    await session.insert()
    
    return TrainingSessionResponse(
        id=str(session.id),
        user_id=session.user_id,
        module_type=session.module_type,
        brainwave_target=session.brainwave_target,
        generated_content=session.generated_content,
        user_rating=session.user_rating,
        effectiveness_score=session.effectiveness_score,
        timestamp=session.timestamp,
        duration_seconds=session.duration_seconds
    )


@router.patch("/{session_id}/rating")
async def update_session_rating(
    session_id: str,
    rating: int = Query(..., ge=1, le=5, description="User rating 1-5")
):
    """
    Update the user rating for a session
    
    - **session_id**: Session to rate
    - **rating**: Rating from 1-5
    """
    session = await TrainingSession.get(session_id)
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session.user_rating = rating
    await session.save()
    
    return {"message": "Rating updated", "session_id": session_id, "rating": rating}
