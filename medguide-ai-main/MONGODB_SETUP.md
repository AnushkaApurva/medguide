# MongoDB Atlas Setup Guide (Free Cloud Database)

Follow these steps to set up MongoDB Atlas for your MedGuideAI project.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click **"Try Free"**
3. Sign up with your email or Google account
4. Complete the registration

## Step 2: Create a Cluster

1. After login, you'll see "Create a deployment"
2. Choose **"M0 Sandbox"** (Free tier)
3. Select **"AWS"** as cloud provider
4. Choose a region close to you (e.g., US East, Europe, etc.)
5. Keep cluster name as **"Cluster0"** or change if you want
6. Click **"Create Deployment"**

## Step 3: Create Database User

1. You'll see a security popup "Create a database user"
2. Choose **"Username and Password"**
3. Set username: `medguide`
4. Set password: `medguide123` (or create your own secure password)
5. Click **"Create User"**

## Step 4: Add IP Address

1. In the same popup, you'll see "Add IP Address"
2. Click **"Add My Current IP Address"**
3. Or click **"Allow Access from Anywhere"** (for development only)
4. Click **"Finish and Close"**

## Step 5: Get Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Drivers"**
3. Select **"Node.js"** and version **"4.1 or later"**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://medguide:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open `medguide-ai-main/backend/.env`
2. Replace the MONGODB_URI with your connection string
3. Replace `<password>` with your actual password
4. Add database name at the end

Example:
```env
MONGODB_URI=mongodb+srv://medguide:medguide123@cluster0.xxxxx.mongodb.net/medguide?retryWrites=true&w=majority
```

## Step 7: Test Connection

```bash
cd medguide-ai-main/backend
npm install
npm run dev
```

You should see:
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB successfully
📍 Database: medguide
🚀 MedGuideAI Backend running on port 5000
```

## Troubleshooting

### Error: "Authentication failed"
- Check username and password in connection string
- Make sure you created the database user correctly

### Error: "Connection timeout"
- Check if your IP address is whitelisted
- Try "Allow Access from Anywhere" for testing

### Error: "Network error"
- Check your internet connection
- Try a different network if possible

## Alternative: Local MongoDB (Advanced)

If you prefer local MongoDB:

1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. Use this connection string in .env:
   ```env
   MONGODB_URI=mongodb://localhost:27017/medguide
   ```

## Next Steps

Once MongoDB is connected:
1. Your backend will automatically create the database and collections
2. Test the API endpoints
3. Connect your React frontend

Your database will store:
- Prescription images (as text)
- Processed OCR results
- Medication information
- Upload timestamps