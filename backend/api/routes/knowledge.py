"""
Brain Knowledge API Routes
Endpoints for scientific knowledge base
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel

from database.models import BrainKnowledge

router = APIRouter()


class Citation(BaseModel):
    """Citation model"""
    title: str
    authors: str
    year: str
    journal: str


class BrainKnowledgeResponse(BaseModel):
    """Response model for brain knowledge"""
    id: str
    stimulus_type: str
    stimulus_parameters: dict
    outcome: str
    evidence_strength: float
    citations: List[Citation]

    class Config:
        json_encoders = {
            dict: lambda v: v
        }


@router.get("/", response_model=List[BrainKnowledgeResponse])
async def get_brain_knowledge(
    stimulus_type: Optional[str] = Query(None, description="Filter by stimulus type"),
    outcome: Optional[str] = Query(None, description="Filter by outcome"),
    min_evidence: Optional[float] = Query(None, ge=0.0, le=1.0, description="Minimum evidence strength"),
    limit: int = Query(50, ge=1, le=100)
):
    """
    Retrieve scientific knowledge base entries
    
    - **stimulus_type**: Filter by type (binaural_beats, meditation, breathwork, etc.)
    - **outcome**: Filter by outcome (increased_focus, reduced_anxiety, etc.)
    - **min_evidence**: Only return entries with evidence strength >= this value
    - **limit**: Maximum results (default 50, max 100)
    """
    query = {}
    
    if stimulus_type:
        query["stimulus_type"] = stimulus_type
    
    if outcome:
        query["outcome"] = outcome
    
    if min_evidence is not None:
        query["evidence_strength"] = {"$gte": min_evidence}
    
    knowledge_entries = await BrainKnowledge.find(query).sort("-evidence_strength").limit(limit).to_list()
    
    return [
        BrainKnowledgeResponse(
            id=str(entry.id),
            stimulus_type=entry.stimulus_type,
            stimulus_parameters=entry.stimulus_parameters,
            outcome=entry.outcome,
            evidence_strength=entry.evidence_strength,
            citations=[Citation(**citation) for citation in entry.citations]
        )
        for entry in knowledge_entries
    ]


@router.get("/{knowledge_id}", response_model=BrainKnowledgeResponse)
async def get_knowledge_by_id(knowledge_id: str):
    """
    Get a specific knowledge entry by ID
    
    - **knowledge_id**: MongoDB ObjectId of the knowledge entry
    """
    entry = await BrainKnowledge.get(knowledge_id)
    
    if not entry:
        raise HTTPException(status_code=404, detail="Knowledge entry not found")
    
    return BrainKnowledgeResponse(
        id=str(entry.id),
        stimulus_type=entry.stimulus_type,
        stimulus_parameters=entry.stimulus_parameters,
        outcome=entry.outcome,
        evidence_strength=entry.evidence_strength,
        citations=[Citation(**citation) for citation in entry.citations]
    )


@router.get("/recommendations/{module_type}")
async def get_module_recommendations(
    module_type: str = Query(..., description="Module type to get recommendations for")
):
    """
    Get scientifically-backed recommendations for a specific training module
    
    - **module_type**: movers, pfc_gym, mental_rehearsal, or brainwave
    """
    # Map module types to relevant stimulus types
    module_to_stimulus = {
        "movers": ["meditation", "breathwork"],
        "pfc_gym": ["breathwork", "neurofeedback"],
        "mental_rehearsal": ["mental_rehearsal", "visualization"],
        "brainwave": ["binaural_beats", "gamma_entrainment", "neurofeedback"]
    }
    
    if module_type not in module_to_stimulus:
        raise HTTPException(status_code=400, detail="Invalid module_type")
    
    relevant_stimuli = module_to_stimulus[module_type]
    
    knowledge_entries = await BrainKnowledge.find(
        {"stimulus_type": {"$in": relevant_stimuli}}
    ).sort("-evidence_strength").to_list()
    
    return {
        "module_type": module_type,
        "recommendations": [
            {
                "stimulus_type": entry.stimulus_type,
                "outcome": entry.outcome,
                "evidence_strength": entry.evidence_strength,
                "parameters": entry.stimulus_parameters,
                "key_citation": entry.citations[0] if entry.citations else None
            }
            for entry in knowledge_entries
        ]
    }
