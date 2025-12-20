# Brain Buddy - Training Data Seeding Guide

## Overview

This guide explains how to populate your Brain Buddy database with realistic training session data derived from real-world neuroscience research and EEG datasets.

## Data Sources

Our seeding script is based on research from:

### 1. **PhysioNet Databases**
- **EEG Motor Movement/Imagery Dataset**: 109 volunteers performing motor tasks
- **Heart Rate Oscillations during Meditation**: 5 groups performing meditation techniques
- **EEG During Mental Arithmetic Tasks**: Brain activity during cognitive tasks
- **Sleep-EDF Database**: 197 whole-night sleep recordings with EEG data

### 2. **OpenNeuro Datasets**
- **17,866+ EEG participants** across 360 public datasets
- **MEG data** from 1,329 participants across 54 datasets
- Focus on meditation, cognitive tasks, and mental states

### 3. **Kaggle Datasets**
- **Confused Student EEG Brainwave Data**: 10,000+ EEG readings
- **EEG Brainwave Dataset: Feeling Emotions**: Emotional state classification
- **Synchronized Brainwave Dataset**: Multi-participant brainwave data
- **Meditation and Mindfulness EEG Data**

## What Gets Seeded

### 1. **Demo Users** (3 accounts)
- `demo_user_1@brainbuddy.com`
- `demo_user_2@brainbuddy.com`
- `demo_user_3@brainbuddy.com`
- Password: `demo_password_123`

### 2. **Training Sessions** (500 default)
Realistic sessions spanning 6 months across 4 module types:

#### Brainwave Training
- **Delta (0.5-4 Hz)**: Deep sleep, healing
- **Theta (4-8 Hz)**: Meditation, creativity
- **Alpha (8-13 Hz)**: Relaxed focus, calm
- **Beta (13-30 Hz)**: Active thinking, concentration
- **Gamma (30-100 Hz)**: Peak performance, insight

Parameters based on real binaural beat research:
- Carrier frequencies (200-400 Hz)
- Binaural beat frequencies matching target state
- Isochronic tones, tempo, harmonic complexity
- Pink noise levels, modulation depth

#### MOVERS Morning Ritual
- Meditation (5-15 min)
- Breathwork cycles (3-10)
- Visualization scripts
- Exercise types (yoga, stretching, cardio, strength)
- Reading topics (neuroplasticity, habits, mindfulness)
- Journal prompts

#### PFC Gym (Prefrontal Cortex Training)
- Procrastination breaker protocols
- Habit rewiring techniques
- Emotional regulation exercises
- State-shift interventions (2-5 min)

#### Mental Rehearsal
- Skill targets (public speaking, athletics, music, etc.)
- High-detail visualization
- Multi-sensory engagement (visual, auditory, kinesthetic, emotional)
- Vividness scoring

### 3. **Brain Knowledge Base** (7+ entries)
Scientific research findings with evidence strength scores:

- **Binaural Beats** (0.68-0.72 evidence strength)
  - Theta waves → creativity
  - Alpha waves → anxiety reduction
  
- **Meditation** (0.85 evidence strength)
  - Increases gray matter in hippocampus
  - Based on Hölzel et al., 2011
  
- **Breathwork** (0.79 evidence strength)
  - Reduces cortisol/stress
  - Box breathing (4-4-4-4 pattern)
  
- **Mental Rehearsal** (0.91 evidence strength)
  - Motor skill acquisition
  - Pascual-Leone piano study
  
- **Neurofeedback** (0.76 evidence strength)
  - Improved attention
  - Alpha band training
  
- **Gamma Entrainment** (0.73 evidence strength)
  - Enhanced cognition at 40 Hz

## Installation & Usage

### Prerequisites
```bash
cd backend
pip install -r requirements.txt
```

### Environment Setup
Create a `.env` file in `/backend`:
```env
MONGODB_URL=mongodb://localhost:27017
# or for MongoDB Atlas:
# MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/
```

### Run the Seeder
```bash
# From the backend directory
python database/seed_training_data.py
```

### Customize the Amount of Data
Edit `seed_training_data.py`:
```python
# Change the number of sessions (default 500)
await seed_training_sessions(num_sessions=1000)  # Generate 1000 sessions
```

## Output

The script will display:
```
============================================================
Brain Buddy - Training Data Seeder
============================================================

Connecting to MongoDB at mongodb://localhost:27017...
✓ Connected to MongoDB
✓ Created 3 demo users
Seeding brain knowledge base...
✓ Successfully seeded 7 knowledge base entries
Generating 500 training sessions...
Inserted batch 1/5
Inserted batch 2/5
...
✓ Successfully seeded 500 training sessions

============================================================
Summary:
  Total Users: 3
  Total Training Sessions: 500
  Total Knowledge Entries: 7

Sessions by Module Type:
  movers: 125
  pfc_gym: 128
  mental_rehearsal: 119
  brainwave: 128

============================================================
✓ Data seeding completed successfully!
============================================================
```

## Data Characteristics

### Realistic Patterns
- **Time Distribution**: Sessions spread across 6 months (past 180 days)
- **User Ratings**: 80% of sessions include user ratings (1-5 stars)
- **Effectiveness Scores**: 70% include AI-calculated effectiveness (0.5-1.0)
- **Duration Variance**: 5 minutes to 1 hour per session
- **Module Distribution**: Roughly equal across all 4 module types

### Music Parameters (Brainwave Module)
Based on real binaural beat research:
- Carrier frequencies scientifically validated
- Beat frequencies match target brainwave state
- Tempo correlates with frequency (60 + base_freq * 2 BPM)
- Harmonic complexity levels: simple, moderate, complex
- Pink noise for natural sound masking

## Resetting Data

To clear all data and reseed:

```python
# Add this to seed_training_data.py main() function
await TrainingSession.delete_all()
await BrainKnowledge.delete_all()
await User.delete_all()
```

Or use MongoDB shell:
```javascript
use brain_buddy
db.sessions.deleteMany({})
db.brain_knowledge.deleteMany({})
db.users.deleteMany({})
```

## Integration with Frontend

The seeded data is immediately available through your API endpoints:

```typescript
// Fetch training sessions
GET /api/sessions?user_id=demo_user_1@brainbuddy.com

// Filter by module type
GET /api/sessions?module_type=brainwave

// Get knowledge base
GET /api/knowledge?stimulus_type=binaural_beats
```

## Scientific Citations

All knowledge base entries include proper citations:
- **Author names**
- **Publication year**
- **Journal/Conference**
- **Study title**
- **Evidence strength score** (0.0-1.0)

This enables:
- Transparent, evidence-based recommendations
- User trust through scientific backing
- Continual learning from validated research

## Next Steps

1. **Run the seeder** to populate your database
2. **Test the API endpoints** with the demo data
3. **Customize parameters** based on your research
4. **Add more knowledge entries** from new studies
5. **Expand user base** with real accounts

## Contributing

To add more data sources:

1. Research new datasets (PhysioNet, OpenNeuro, Kaggle)
2. Extract relevant parameters
3. Update `seed_training_data.py` with new patterns
4. Add citations to knowledge base
5. Test data quality and realism

## Support

For questions or issues:
- Check the main [README.md](../README.md)
- Review [MONGODB_SETUP.md](MONGODB_SETUP.md)
- Open an issue on GitHub

---

**Note**: This seeded data is for development and demonstration purposes. For production, use real user data with proper privacy protections and informed consent.
