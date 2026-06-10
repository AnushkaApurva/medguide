# Complete MedGuideAI Setup - From Zero to Running

This guide will take you from nothing to a fully working MedGuideAI application.

## 🎯 What We'll Set Up

1. ✅ MongoDB Atlas (Cloud Database) - FREE
2. ✅ Backend Server (Node.js + Express)
3. ✅ Frontend (React)
4. ✅ Connection between Frontend and Backend

---

## Part 1: MongoDB Setup (5 minutes)

### Step 1.1: Create MongoDB Atlas Account

1. Open browser and go to: https://www.mongodb.com/atlas
2. Click **"Try Free"**
3. Sign up with email or Google
4. Verify your email if needed

### Step 1.2: Create Free Database

1. After login, click **"Create"** or **"Build a Database"**
2. Choose **"M0 FREE"** option
3. Select cloud provider: **AWS**
4. Choose region closest to you
5. Cluster name: Keep as **"Cluster0"**
6. Click **"Create Cluster"** (takes 1-3 minutes)

### Step 1.3: Create Database User

1. You'll see "Security Quickstart"
2. **Authentication Method**: Username and Password
3. Username: `medguide`
4. Password: `medguide123` (remember this!)
5. Click **"Create User"**

### Step 1.4: Allow Network Access

1. Still in Security Quickstart
2. Click **"Add My Current IP Address"**
3. Or click **"Allow Access from Anywhere"** (easier for development)
4. Click **"Finish and Close"**

### Step 1.5: Get Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **4.1 or later**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://medguide:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT**: Replace `<password>` with `medguide123`
6. Add `/medguide` before the `?` to specify database name

Final connection string should look like:
```
mongodb+srv://medguide:medguide123@cluster0.xxxxx.mongodb.net/medguide?retryWrites=true&w=majority
```

---

## Part 2: Backend Setup (10 minutes)

### Step 2.1: Install Backend Dependencies

Open terminal/command prompt:

```bash
cd medguide-ai-main/backend
npm install
```

Wait for installation to complete (may take 2-5 minutes).

### Step 2.2: Configure Environment Variables

1. Open file: `medguide-ai-main/backend/.env`
2. Update the `MONGODB_URI` line with YOUR connection string from Step 1.5:

```env
PORT=5000

MONGODB_URI=mongodb+srv://medguide:medguide123@cluster0.xxxxx.mongodb.net/medguide?retryWrites=true&w=majority

GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json

NODE_ENV=development
```

**Replace the xxxxx part with your actual cluster URL!**

### Step 2.3: Set Up Google Vision API (Optional for now)

For now, let's skip Google Vision and test the basic setup first. We'll add it later.

Comment out the Google Vision code temporarily:

1. Open `medguide-ai-main/backend/server.js`
2. Find line with `const visionClient = new vision.ImageAnnotatorClient`
3. We'll handle this in the next section

### Step 2.4: Start Backend Server

```bash
npm run dev
```

You should see:
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB successfully
📍 Database: medguide
🚀 MedGuideAI Backend running on port 5000
```

**If you see errors**, check:
- MongoDB connection string is correct
- Password doesn't have special characters (or is URL encoded)
- IP address is whitelisted in Atlas

Keep this terminal open!

---

## Part 3: Frontend Setup (5 minutes)

### Step 3.1: Install Frontend Dependencies

Open a **NEW terminal** (keep backend running):

```bash
cd medguide-ai-main/medguide-ai-main
npm install
```

### Step 3.2: Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 3.3: Open in Browser

1. Open browser
2. Go to: http://localhost:5173/
3. Your React app should load!

---

## Part 4: Test Connection (2 minutes)

### Step 4.1: Test Backend API

Open browser and go to: http://localhost:5000/

You should see:
```json
{
  "message": "MedGuideAI Backend is running!",
  "status": "healthy",
  "timestamp": "2024-..."
}
```

### Step 4.2: Test Database Connection

Go to: http://localhost:5000/prescriptions

You should see:
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

This means backend is connected to MongoDB!

---

## Part 5: Connect Frontend to Backend

### Step 5.1: Update Your Upload Component

Open your upload page (e.g., `src/pages/Upload.jsx`) and add this code:

```javascript
import React, { useState } from 'react';
import apiService from '../services/api';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Call backend API
      const response = await apiService.uploadPrescription(selectedFile);
      
      // Show results
      setResult(response.data);
      alert('Prescription uploaded successfully!');
      
    } catch (err) {
      setError(err.message);
      alert('Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload Prescription</h1>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileSelect}
        disabled={loading}
      />
      
      <button 
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        style={{ marginLeft: '10px' }}
      >
        {loading ? 'Processing...' : 'Upload'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Results:</h3>
          <p><strong>Original Text:</strong></p>
          <pre>{result.originalText}</pre>
          
          <p><strong>Processed Text:</strong></p>
          <pre>{result.processedText}</pre>
          
          <p><strong>Processing Time:</strong> {result.processingTime}ms</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
```

---

## Part 6: Google Vision API Setup (When Ready)

### Step 6.1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click **"Select a project"** → **"New Project"**
3. Project name: `MedGuideAI`
4. Click **"Create"**

### Step 6.2: Enable Vision API

1. In Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. Search for **"Cloud Vision API"**
3. Click on it and click **"Enable"**

### Step 6.3: Create Service Account

1. Go to **"IAM & Admin"** → **"Service Accounts"**
2. Click **"Create Service Account"**
3. Name: `medguide-ocr`
4. Click **"Create and Continue"**
5. Role: Select **"Project"** → **"Editor"**
6. Click **"Continue"** → **"Done"**

### Step 6.4: Create Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Choose **"JSON"**
5. Click **"Create"** (file will download)

### Step 6.5: Add Key to Project

1. Rename downloaded file to `google-credentials.json`
2. Move it to `medguide-ai-main/backend/` folder
3. Make sure `.env` has: `GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json`

### Step 6.6: Restart Backend

Stop backend (Ctrl+C) and start again:
```bash
npm run dev
```

Now OCR will work!

---

## 🎉 You're Done!

### What's Running:

1. **MongoDB Atlas**: Cloud database storing your data
2. **Backend**: http://localhost:5000 (API server)
3. **Frontend**: http://localhost:5173 (React app)

### Test Everything:

1. Open frontend: http://localhost:5173
2. Go to Upload page
3. Select a prescription image
4. Click Upload
5. See the processed results!

### View Your Data:

1. Go to MongoDB Atlas website
2. Click **"Browse Collections"**
3. See your uploaded prescriptions!

---

## 🐛 Common Issues

### Backend won't start
- Check MongoDB connection string
- Make sure password is correct
- Verify IP is whitelisted in Atlas

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check `src/services/api.js` has correct URL
- Try restarting both servers

### OCR not working
- Google Vision API setup is optional for basic testing
- You can test upload without OCR first
- Add Google credentials when ready

---

## 📞 Need Help?

Check these files:
- `MONGODB_SETUP.md` - Detailed MongoDB guide
- `backend/README.md` - Backend documentation
- `SETUP_GUIDE.md` - General setup guide

Your MedGuideAI is now ready to use! 🚀