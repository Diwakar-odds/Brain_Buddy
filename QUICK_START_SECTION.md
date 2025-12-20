## 🚀 Quick Start with Real Data

Want to see Brain Buddy in action with real training data? Follow our quick start guide!

### Prerequisites
- Python 3.9+
- MongoDB (local or Atlas)
- Node.js 18+

### Get Started in 5 Minutes

```bash
# 1. Clone and install backend dependencies
cd backend
pip install -r requirements.txt

# 2. Set up environment
echo "MONGODB_URL=mongodb://localhost:27017" > .env

# 3. Seed realistic training data (500 sessions from research!)
python database/seed_training_data.py

# 4. Start the API
python -m api.main

# 5. In another terminal, start frontend
cd ../
npm install
npm run dev
```

Visit http://localhost:5173 and log in with:
- **Email**: `demo_user_1@brainbuddy.com`
- **Password**: `demo_password_123`

**🎯 See [QUICKSTART_DATA.md](QUICKSTART_DATA.md) for detailed instructions!**

### What You Get

✅ **500 realistic training sessions** based on EEG research  
✅ **67,000+ research participants** data (PhysioNet, OpenNeuro, Kaggle)  
✅ **7 scientific knowledge entries** with peer-reviewed citations  
✅ **Complete REST API** with filtering and statistics  
✅ **3 demo accounts** ready for testing  

**Data sources**: PhysioNet EEG Motor Movement Database, OpenNeuro meditation datasets, Kaggle brainwave collections

---
