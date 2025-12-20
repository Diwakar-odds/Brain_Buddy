"""
Verification Script
Test that data seeding and API endpoints work correctly
"""

import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import os
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from database.models import TrainingSession, BrainKnowledge, User

load_dotenv()


async def verify_data():
    """Verify that data was seeded correctly"""
    print("=" * 60)
    print("Brain Buddy - Data Verification")
    print("=" * 60)
    
    # Connect to MongoDB
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME = "brain_buddy"
    
    print(f"\n1. Connecting to MongoDB at {MONGODB_URL}...")
    try:
        client = AsyncIOMotorClient(MONGODB_URL)
        await init_beanie(
            database=client[DATABASE_NAME],
            document_models=[User, TrainingSession, BrainKnowledge]
        )
        print("   ✅ Connected successfully")
    except Exception as e:
        print(f"   ❌ Connection failed: {e}")
        return False
    
    # Check users
    print("\n2. Checking users...")
    user_count = await User.count()
    if user_count >= 3:
        print(f"   ✅ Found {user_count} users")
        users = await User.find().limit(3).to_list()
        for user in users:
            print(f"      - {user.email}")
    else:
        print(f"   ⚠️  Only {user_count} users found (expected at least 3)")
    
    # Check sessions
    print("\n3. Checking training sessions...")
    session_count = await TrainingSession.count()
    if session_count >= 100:
        print(f"   ✅ Found {session_count} sessions")
        
        # Check distribution
        for module in ["movers", "pfc_gym", "mental_rehearsal", "brainwave"]:
            count = await TrainingSession.find(TrainingSession.module_type == module).count()
            print(f"      - {module}: {count}")
    else:
        print(f"   ⚠️  Only {session_count} sessions found (expected at least 100)")
    
    # Check brainwave sessions
    print("\n4. Checking brainwave sessions...")
    brainwave_count = await TrainingSession.find(
        TrainingSession.module_type == "brainwave"
    ).count()
    if brainwave_count > 0:
        print(f"   ✅ Found {brainwave_count} brainwave sessions")
        for state in ["delta", "theta", "alpha", "beta", "gamma"]:
            count = await TrainingSession.find(
                TrainingSession.brainwave_target == state
            ).count()
            if count > 0:
                print(f"      - {state}: {count}")
    else:
        print("   ⚠️  No brainwave sessions found")
    
    # Check knowledge base
    print("\n5. Checking brain knowledge base...")
    knowledge_count = await BrainKnowledge.count()
    if knowledge_count >= 5:
        print(f"   ✅ Found {knowledge_count} knowledge entries")
        entries = await BrainKnowledge.find().to_list()
        for entry in entries:
            print(f"      - {entry.stimulus_type} → {entry.outcome}")
            print(f"        Evidence: {entry.evidence_strength:.2f}")
    else:
        print(f"   ⚠️  Only {knowledge_count} knowledge entries (expected at least 5)")
    
    # Check sample session data
    print("\n6. Checking sample session data quality...")
    sample_session = await TrainingSession.find_one(
        TrainingSession.module_type == "brainwave"
    )
    if sample_session:
        print("   ✅ Sample brainwave session:")
        print(f"      - User: {sample_session.user_id}")
        print(f"      - Target: {sample_session.brainwave_target}")
        print(f"      - Duration: {sample_session.duration_seconds}s")
        if sample_session.generated_content:
            print(f"      - Music params: {len(sample_session.generated_content)} fields")
            if 'binaural_beat_frequency' in sample_session.generated_content:
                print(f"        - Binaural beat: {sample_session.generated_content['binaural_beat_frequency']} Hz")
        if sample_session.user_rating:
            print(f"      - Rating: {sample_session.user_rating}/5")
    else:
        print("   ⚠️  No sample session found")
    
    # Summary
    print("\n" + "=" * 60)
    print("Summary:")
    print(f"  Users: {user_count}")
    print(f"  Sessions: {session_count}")
    print(f"  Knowledge: {knowledge_count}")
    
    all_good = user_count >= 3 and session_count >= 100 and knowledge_count >= 5
    
    if all_good:
        print("\n✅ All checks passed! Data is ready to use.")
        print("\nNext steps:")
        print("  1. Start the API: python -m api.main")
        print("  2. Visit http://localhost:8000/docs")
        print("  3. Test endpoints with demo users")
    else:
        print("\n⚠️  Some checks failed. Consider re-running the seeder:")
        print("     python database/seed_training_data.py")
    
    print("=" * 60)
    
    return all_good


if __name__ == "__main__":
    result = asyncio.run(verify_data())
    sys.exit(0 if result else 1)
