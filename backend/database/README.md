# MongoDB Database Documentation

## Overview

Brain Buddy uses MongoDB Atlas as its database, with Beanie ODM for async document modeling in Python.

## Schema Design

### Collections

#### 1. **users**
Stores user account information and preferences.

```python
{
    "_id": ObjectId,
    "email": "user@example.com",
    "hashed_password": "...",
    "chronotype": "bear",  # lion, bear, wolf, dolphin
    "created_at": ISODate,
    "privacy_settings": {}
}
```

**Indexes:**
- `email` (unique)

---

#### 2. **sessions**
Training session records with performance metrics.

```python
{
    "_id": ObjectId,
    "user_id": "user_object_id",
    "module_type": "brainwave",  # movers, pfc_gym, mental_rehearsal, brainwave
    "brainwave_target": "alpha",  # alpha, beta, theta, delta, gamma
    "generated_content": {
        "frequency": 10.5,
        "duration": 600
    },
    "user_rating": 4,  # 1-5
    "effectiveness_score": 0.85,  # 0-1
    "timestamp": ISODate,
    "duration_seconds": 600
}
```

**Indexes:**
- `user_id`
- `module_type`
- `timestamp`

---

#### 3. **brain_knowledge**
Scientific knowledge base for evidence-based training.

```python
{
    "_id": ObjectId,
    "stimulus_type": "binaural_beats",
    "stimulus_parameters": {
        "carrier_frequency": 200,
        "beat_frequency": 10
    },
    "outcome": "increased_focus",
    "evidence_strength": 0.78,
    "citations": [
        {
            "title": "...",
            "authors": "...",
            "year": 2023,
            "doi": "..."
        }
    ],
    "created_at": ISODate
}
```

**Indexes:**
- `stimulus_type`
- `outcome`

---

#### 4. **user_models**
Encrypted AI model weights for personalized training.

```python
{
    "_id": ObjectId,
    "user_id": "user_object_id",  # unique
    "model_weights": "encrypted_blob_or_path",
    "last_updated": ISODate,
    "training_steps": 150,
    "phase": "adaptive"  # developmental or adaptive
}
```

**Indexes:**
- `user_id` (unique)

---

#### 5. **habits**
Habit tracking for PFC Gym module.

```python
{
    "_id": ObjectId,
    "user_id": "user_object_id",
    "habit_type": "negative_loop",  # negative_loop, positive_routine
    "trigger": "stress at work",
    "routine": "scrolling social media",
    "reward": "temporary distraction",
    "interrupt_protocol": {
        "technique": "breathing_exercise",
        "duration": 60
    },
    "success_count": 12,
    "attempt_count": 20,
    "created_at": ISODate
}
```

**Indexes:**
- `user_id`
- `habit_type`

---

## Migration Notes

### From SQLAlchemy to Beanie

**Key Changes:**
1. **ORM → ODM**: SQLAlchemy's relational model replaced with Beanie's document model
2. **Foreign Keys → References**: `ForeignKey` replaced with string references to user IDs
3. **JSON Columns → Native Dicts**: MongoDB natively supports nested documents
4. **Sync → Async**: All database operations are now async

**Benefits:**
- Better performance with async operations
- Flexible schema for AI-generated content
- Native JSON support for complex data structures
- Easier horizontal scaling

---

## Connection Configuration

### Environment Variables

```bash
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/brain_buddy?retryWrites=true&w=majority
```

### Getting MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (M0 tier)
3. Create a database user:
   - Click "Database Access"
   - Add new database user with password
4. Whitelist your IP:
   - Click "Network Access"
   - Add IP Address (or allow from anywhere for development: `0.0.0.0/0`)
5. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

---

## Usage Examples

### Creating a User

```python
from database.models import User

user = User(
    email="user@example.com",
    hashed_password="hashed_pw_here",
    chronotype="bear"
)
await user.insert()
```

### Querying Sessions

```python
from database.models import TrainingSession

# Find all sessions for a user
sessions = await TrainingSession.find(
    TrainingSession.user_id == user_id
).to_list()

# Find sessions by module type
brainwave_sessions = await TrainingSession.find(
    TrainingSession.module_type == "brainwave"
).sort(-TrainingSession.timestamp).limit(10).to_list()
```

### Updating a Document

```python
user = await User.find_one(User.email == "user@example.com")
user.chronotype = "lion"
await user.save()
```

### Deleting a Document

```python
await user.delete()
```

---

## Performance Optimization

### Indexes

All collections have appropriate indexes defined in the model's `Settings` class. These are automatically created when Beanie initializes.

### Query Optimization Tips

1. Use projection to fetch only needed fields:
   ```python
   users = await User.find_all().project(User.email, User.chronotype).to_list()
   ```

2. Use aggregation for complex queries:
   ```python
   pipeline = [
       {"$match": {"user_id": user_id}},
       {"$group": {"_id": "$module_type", "count": {"$sum": 1}}}
   ]
   results = await TrainingSession.aggregate(pipeline).to_list()
   ```

3. Batch operations when possible:
   ```python
   await TrainingSession.insert_many([session1, session2, session3])
   ```

---

## Backup and Recovery

MongoDB Atlas provides automated backups. To manually backup:

1. Go to your cluster in Atlas
2. Click "Backup" tab
3. Configure backup schedule
4. Download snapshots as needed

For local development, use `mongodump`:

```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

Restore with `mongorestore`:

```bash
mongorestore --uri="mongodb+srv://..." ./backup
```
