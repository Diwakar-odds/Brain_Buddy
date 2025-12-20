# MongoDB Atlas Setup Guide for Brain Buddy

This guide will walk you through setting up MongoDB Atlas and connecting it to your Brain Buddy backend.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (perfect for development)
3. Select your preferred cloud provider and region (choose one closest to you)
4. Name your cluster (e.g., "BrainBuddyCluster")
5. Click **"Create"** and wait 3-5 minutes for provisioning

## Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., "brainbuddy_admin")
5. Click **"Autogenerate Secure Password"** and **SAVE THIS PASSWORD**
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Configure Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, use specific IP addresses
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Python"** and version **"3.12 or later"**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Your Application

1. Navigate to your backend directory:
   ```bash
   cd f:\Projects\Brain_tech\backend
   ```

2. Create `.env` file from example:
   ```bash
   copy .env.example .env
   ```

3. Edit `.env` and update the MongoDB URL:
   ```
   MONGODB_URL=mongodb+srv://brainbuddy_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/brain_buddy?retryWrites=true&w=majority
   ```
   
   Replace:
   - `brainbuddy_admin` with your database username
   - `YOUR_PASSWORD` with the password you saved
   - `cluster0.xxxxx` with your actual cluster address
   - Added `/brain_buddy` before the `?` to specify the database name

## Step 7: Install Dependencies

```bash
# Make sure you're in the backend directory
cd f:\Projects\Brain_tech\backend

# Create virtual environment if you haven't
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# Install/update dependencies
pip install -r requirements.txt
```

## Step 8: Test Connection

Test the MongoDB connection:

```bash
python database/models.py
```

You should see:
```
✅ Connected to MongoDB: brain_buddy
✅ Initialized Beanie with 5 document models
Database status: {'status': 'connected', 'database': 'brain_buddy', 'url': '...'}
✅ MongoDB connection closed
```

## Step 9: Start the API

```bash
# From backend directory
uvicorn api.main:app --reload
```

Or:

```bash
python api/main.py
```

You should see:
```
🧠 Brain Buddy API starting...
✅ Connected to MongoDB: brain_buddy
✅ Initialized Beanie with 5 document models
✅ Database initialized
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## Step 10: Verify Everything Works

1. Open your browser and go to: http://localhost:8000
   - You should see: `{"status": "online", "message": "Brain Buddy API is running", "version": "0.1.0"}`

2. Check the health endpoint: http://localhost:8000/health
   - You should see database status as "connected"

3. View API documentation: http://localhost:8000/docs
   - Interactive Swagger UI for testing endpoints

## Troubleshooting

### Connection Timeout
- **Problem**: "ServerSelectionTimeoutError"
- **Solution**: Check your IP is whitelisted in Network Access

### Authentication Failed
- **Problem**: "Authentication failed"
- **Solution**: Verify username and password in connection string

### Database Not Found
- **Problem**: Collections not appearing
- **Solution**: MongoDB creates databases/collections on first write operation

### Import Errors
- **Problem**: "ModuleNotFoundError: No module named 'motor'"
- **Solution**: Make sure virtual environment is activated and dependencies installed:
  ```bash
  venv\Scripts\activate
  pip install -r requirements.txt
  ```

## Next Steps

1. ✅ MongoDB Atlas is connected
2. Create API endpoints for users, sessions, etc.
3. Implement authentication
4. Build frontend integration
5. Deploy to production

## Useful MongoDB Atlas Features

- **Metrics**: Monitor database performance
- **Charts**: Visualize your data
- **Triggers**: Set up automated functions
- **Realm**: Add authentication and sync
- **Backup**: Automatic backups on paid tiers

## Security Best Practices

1. ✅ Use strong passwords for database users
2. ✅ Restrict IP addresses in production
3. ✅ Use environment variables for credentials
4. ✅ Enable encryption at rest (available on paid tiers)
5. ✅ Regularly rotate passwords
6. ✅ Monitor access logs

---

**Congratulations! Your MongoDB Atlas database is now connected to Brain Buddy! 🎉**
