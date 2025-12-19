# Brain Buddy - Project Structure

## Overview
```
Brain_tech/
├── backend/                    # Python/FastAPI backend
│   ├── ai/                    # AI models and training
│   │   ├── continual_learning/
│   │   │   ├── __init__.py
│   │   │   ├── ocl_engine.py          # OCL-PDS framework ✅
│   │   │   ├── autoprog.py            # Automated Progressive Learning
│   │   │   ├── generative_replay.py   # Memory consolidation
│   │   │   └── self_distillation.py   # Self-KD
│   │   ├── generative/
│   │   │   ├── __init__.py
│   │   │   ├── music_generator.py     # VAE/GAN music generation ✅
│   │   │   ├── script_generator.py    # LLM visualization scripts
│   │   │   └── verification.py        # Hybrid verification system
│   │   ├── cognitive_model/
│   │   │   ├── __init__.py
│   │   │   ├── limbic_module.py       # Fast emotional processing
│   │   │   ├── pfc_module.py          # Slow analytical reasoning
│   │   │   └── dmn_module.py          # Default Mode Network
│   │   └── __init__.py ✅
│   ├── api/                   # FastAPI endpoints
│   │   ├── main.py ✅                 # Main application
│   │   ├── routes/
│   │   │   ├── users.py               # User management
│   │   │   ├── sessions.py            # Training sessions
│   │   │   ├── movers.py              # MOVERS ritual
│   │   │   ├── brainwave.py           # Brainwave training
│   │   │   └── pfc_gym.py             # PFC Gym
│   │   └── dependencies.py            # Shared dependencies
│   ├── data/                  # Data pipeline
│   │   ├── scrapers/
│   │   │   ├── pubmed_scraper.py      # Scientific papers
│   │   │   └── eeg_loader.py          # EEG datasets
│   │   └── processors/
│   │       └── nlp_parser.py          # NLP for research papers
│   ├── database/              # Database models
│   │   ├── models.py ✅               # SQLAlchemy models
│   │   └── migrations/                # Alembic migrations
│   ├── .env.example ✅                # Environment template
│   ├── .gitignore ✅                  # Git ignore rules
│   ├── requirements.txt ✅            # Python dependencies
│   └── README.md ✅                   # Backend documentation
├── frontend/                  # Next.js/React frontend
│   ├── components/            # Reusable UI components
│   ├── modules/               # Feature modules
│   │   ├── movers/
│   │   ├── brainwave/
│   │   ├── pfc_gym/
│   │   └── mental_rehearsal/
│   └── pages/                 # Next.js pages
├── src/                       # Current Vite/React (to be migrated)
├── tests/                     # Test suites
├── docs/                      # Documentation
│   ├── RESEARCH_FOUNDATION.md ✅
│   ├── DEEP_RESEARCH_THOUGHTS.md ✅
│   └── research.txt ✅
├── .gitignore ✅
├── README.md ✅
└── package.json ✅
```

## Status Legend
- ✅ Completed
- 🔄 In Progress
- ⏳ Planned

## Next Steps
1. Complete AI module implementations
2. Create API routes
3. Set up database migrations
4. Build frontend modules
5. Integrate frontend with backend
