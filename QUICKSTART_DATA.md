# 🚀 Quick Start Guide: Adding Real Training Data

This guide will walk you through populating your Brain Buddy application with real training session data derived from neuroscience research.

## 📊 What You'll Get

After following this guide, you'll have:
- **500 realistic training sessions** across 4 module types
- **7 scientific knowledge base entries** with citations
- **3 demo user accounts** for testing
- **Working API endpoints** to access all data
- Data spanning **6 months** of realistic usage patterns

## 🎯 Step-by-Step Instructions

### Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Required packages:
- `motor` - MongoDB async driver
- `beanie` - ODM for MongoDB
- `fastapi` - Web framework
- `python-dotenv` - Environment variables
- `passlib[bcrypt]` - Password hashing

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Start MongoDB service
mongod --dbpath /path/to/data
```

**Option B: MongoDB Atlas (Free Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Whitelist your IP

### Step 3: Configure Environment

Create `backend/.env`:
```env
# Local MongoDB
MONGODB_URL=mongodb://localhost:27017

# OR MongoDB Atlas
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Step 4: Run the Data Seeder

```bash
cd backend
python database/seed_training_data.py
```

Expected output:
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
```

### Step 5: Start the Backend API

```bash
cd backend
python -m api.main

# Or with auto-reload for development
uvicorn api.main:app --reload --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs (Interactive Swagger UI)
- **Health**: http://localhost:8000/health

### Step 6: Test the API Endpoints

#### Get Training Sessions
```bash
# Get all sessions (limited to 100)
curl http://localhost:8000/api/sessions/

# Filter by user
curl http://localhost:8000/api/sessions/?user_id=demo_user_1@brainbuddy.com

# Filter by module type
curl http://localhost:8000/api/sessions/?module_type=brainwave

# Filter by brainwave target
curl http://localhost:8000/api/sessions/?brainwave_target=alpha

# Get last 30 days
curl http://localhost:8000/api/sessions/?days=30

# Pagination
curl http://localhost:8000/api/sessions/?limit=50&skip=0
```

#### Get Session Statistics
```bash
# Get user stats
curl "http://localhost:8000/api/sessions/stats?user_id=demo_user_1@brainbuddy.com"

# Response includes:
# - total_sessions
# - total_hours
# - average_rating
# - sessions_by_module
# - sessions_by_brainwave
# - recent_sessions (last 7 days)
```

#### Get Brain Knowledge
```bash
# Get all knowledge entries
curl http://localhost:8000/api/knowledge/

# Filter by stimulus type
curl http://localhost:8000/api/knowledge/?stimulus_type=binaural_beats

# Filter by minimum evidence strength
curl http://localhost:8000/api/knowledge/?min_evidence=0.8

# Get recommendations for a module
curl http://localhost:8000/api/knowledge/recommendations/brainwave
```

### Step 7: Update Frontend to Use Real Data

Update your [Training.tsx](../src/pages/Training.tsx):

```typescript
// Instead of mock data, fetch from API
const fetchSessions = async () => {
  const response = await fetch(
    `http://localhost:8000/api/sessions/?user_id=${user.email}&limit=50`
  );
  const data = await response.json();
  setSessions(data);
};

// Get user statistics
const fetchStats = async () => {
  const response = await fetch(
    `http://localhost:8000/api/sessions/stats?user_id=${user.email}`
  );
  const stats = await response.json();
  setUserStats(stats);
};
```

## 📱 Demo User Accounts

You can use these accounts for testing:

| Email | Password |
|-------|----------|
| demo_user_1@brainbuddy.com | demo_password_123 |
| demo_user_2@brainbuddy.com | demo_password_123 |
| demo_user_3@brainbuddy.com | demo_password_123 |

## 📈 Data Overview

### Training Session Distribution

**By Module Type:**
- **MOVERS**: Morning rituals (meditation, breathwork, visualization)
- **PFC Gym**: Prefrontal cortex training (habit breaking, focus)
- **Mental Rehearsal**: Skill visualization and practice
- **Brainwave**: Audio entrainment with binaural beats

**By Brainwave State:**
- **Delta (0.5-4 Hz)**: Deep sleep, healing
- **Theta (4-8 Hz)**: Meditation, creativity
- **Alpha (8-13 Hz)**: Relaxed focus, calm
- **Beta (13-30 Hz)**: Active thinking, concentration
- **Gamma (30-100 Hz)**: Peak performance, insight

### Knowledge Base Entries

All entries include:
- Stimulus type and parameters
- Expected outcome
- Evidence strength score (0.0-1.0)
- Scientific citations (author, year, journal)

Topics covered:
- Binaural beats for creativity and anxiety
- Meditation for brain structure changes
- Breathwork for stress reduction
- Mental rehearsal for skill acquisition
- Neurofeedback for attention
- Gamma entrainment for cognition

## 🔧 Customization

### Generate More/Less Data

Edit `seed_training_data.py`:
```python
# Change from 500 to any number
await seed_training_sessions(num_sessions=1000)
```

### Add Your Own Knowledge Entries

Add to the `knowledge_entries` list in `seed_training_data.py`:
```python
{
    "stimulus_type": "your_stimulus",
    "stimulus_parameters": {
        "param1": "value1"
    },
    "outcome": "your_outcome",
    "evidence_strength": 0.85,
    "citations": [
        {
            "title": "Research Title",
            "authors": "Author et al.",
            "year": "2024",
            "journal": "Journal Name"
        }
    ]
}
```

### Reset and Reseed

To start fresh:
```bash
# Method 1: Use MongoDB shell
mongosh
use brain_buddy
db.sessions.deleteMany({})
db.brain_knowledge.deleteMany({})
db.users.deleteMany({})

# Method 2: Drop entire database
use brain_buddy
db.dropDatabase()

# Then run seeder again
python database/seed_training_data.py
```

## 🌐 API Documentation

### Available Endpoints

**Sessions**
- `GET /api/sessions/` - List sessions with filters
- `GET /api/sessions/{id}` - Get specific session
- `GET /api/sessions/stats` - Get user statistics
- `POST /api/sessions/` - Create new session
- `PATCH /api/sessions/{id}/rating` - Update session rating

**Knowledge**
- `GET /api/knowledge/` - List knowledge entries
- `GET /api/knowledge/{id}` - Get specific entry
- `GET /api/knowledge/recommendations/{module}` - Get module recommendations

Visit http://localhost:8000/docs for interactive documentation.

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: Connection refused
```
**Solution**: Ensure MongoDB is running
```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Start MongoDB service
mongod --dbpath /path/to/data
```

### Import Error: No module named 'motor'
```
ModuleNotFoundError: No module named 'motor'
```
**Solution**: Install dependencies
```bash
pip install -r requirements.txt
```

### CORS Error in Frontend
```
Access to fetch blocked by CORS policy
```
**Solution**: Update `backend/.env`
```env
FRONTEND_URL=http://localhost:5173
```

### API Returns Empty Array
```json
[]
```
**Solution**: Data might not be seeded or filters too restrictive
```bash
# Check data exists
mongosh
use brain_buddy
db.sessions.countDocuments()

# Reseed if needed
python database/seed_training_data.py
```

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file configured
- [ ] Data seeder completed successfully
- [ ] Backend API is running (http://localhost:8000)
- [ ] API docs accessible (http://localhost:8000/docs)
- [ ] Can fetch sessions via API
- [ ] Can fetch knowledge entries via API
- [ ] Frontend can connect to backend

## 🎓 Next Steps

1. **Integrate with Frontend**: Update React components to fetch real data
2. **Add Authentication**: Implement user login/registration
3. **Create Session Recording**: Allow users to track new sessions
4. **Build Analytics Dashboard**: Visualize training progress
5. **Add AI Features**: Implement personalized recommendations

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Beanie ODM Guide](https://beanie-odm.dev/)
- [PhysioNet Databases](https://physionet.org/about/database/)
- [OpenNeuro Datasets](https://openneuro.org/)

## 🆘 Need Help?

- Check [README_DATA_SEEDING.md](README_DATA_SEEDING.md) for detailed info
- Review [MONGODB_SETUP.md](MONGODB_SETUP.md) for database setup
- Open an issue on GitHub
- Review API docs at http://localhost:8000/docs

---

**Happy Training! 🧠✨**
