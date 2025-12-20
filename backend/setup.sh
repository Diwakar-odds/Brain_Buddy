#!/bin/bash
# Quick setup script for Brain Buddy data seeding

echo "============================================================"
echo "Brain Buddy - Quick Setup Script"
echo "============================================================"

# Step 1: Check Python
echo ""
echo "Step 1: Checking Python..."
python --version
if [ $? -ne 0 ]; then
    echo "❌ Python not found. Please install Python 3.9+"
    exit 1
fi
echo "✅ Python found"

# Step 2: Install dependencies
echo ""
echo "Step 2: Installing dependencies..."
pip install -r requirements.minimal.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"

# Step 3: Check MongoDB
echo ""
echo "Step 3: Checking MongoDB connection..."
echo "Note: Make sure MongoDB is running!"
echo "      Local: mongod --dbpath /path/to/data"
echo "      Or use MongoDB Atlas cloud"

# Step 4: Create .env if it doesn't exist
echo ""
echo "Step 4: Setting up environment..."
if [ ! -f .env ]; then
    echo "MONGODB_URL=mongodb://localhost:27017" > .env
    echo "FRONTEND_URL=http://localhost:5173" >> .env
    echo "✅ Created .env file"
else
    echo "✅ .env file exists"
fi

# Step 5: Seed data
echo ""
echo "Step 5: Seeding training data..."
echo "This will create 500 training sessions..."
python database/seed_training_data.py
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Data seeding failed!"
    echo ""
    echo "Common issues:"
    echo "  1. MongoDB not running"
    echo "  2. Connection string incorrect in .env"
    echo "  3. Database permissions"
    echo ""
    echo "Try:"
    echo "  - Start MongoDB: mongod --dbpath /path/to/data"
    echo "  - Check .env file for correct MONGODB_URL"
    exit 1
fi

# Step 6: Verify data
echo ""
echo "Step 6: Verifying data..."
python database/verify_data.py
if [ $? -ne 0 ]; then
    echo "⚠️  Verification failed, but data might be partially seeded"
fi

# Success!
echo ""
echo "============================================================"
echo "✅ Setup Complete!"
echo "============================================================"
echo ""
echo "Next steps:"
echo "  1. Start API: python -m api.main"
echo "  2. Visit: http://localhost:8000/docs"
echo "  3. Login: demo_user_1@brainbuddy.com / demo_password_123"
echo ""
echo "============================================================"
