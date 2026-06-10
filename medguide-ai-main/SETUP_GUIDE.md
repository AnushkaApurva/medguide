# MedGuideAI Complete Setup Guide

This guide will help you set up both the frontend and backend for MedGuideAI.

## 📋 Prerequisites

Before starting, make sure you have:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)
- **Google Cloud Account** - [Sign up here](https://cloud.google.com/) (free tier available)

## 🚀 Quick Start (5 Steps)

### Step 1: Install Backend Dependencies

```bash
cd medguide-ai-main/backend
npm install
```

### Step 2: Set Up Google Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Vision API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Vision API" and enable it
4. Create service account:
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Give it a name like "medguide-ocr"
   - Grant "Project → Editor" role
   - Click "Create Key" → "JSON"
   - Download the JSON file
5. Save the JSON file as `google-credentials.json` in the `backend` folder

### Step 3: Set Up Environment Variables

```bash
cd medguide-ai-main/backend
cp .env.example .env
```

Edit the `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medguide
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
NODE_ENV=development
```

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Get connection string and update `MONGODB_URI` in `.env`

### Step 5: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd medguide-ai-main/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd medguide-ai-main/medguide-ai-main
npm run dev
```

## ✅ Verify Setup

1. **Backend**: Visit `http://localhost:5000` - should show "MedGuideAI Backend is running!"
2. **Frontend**: Visit `http://localhost:5173` - should show your React app
3. **Test Upload**: Try uploading a prescription image in your app

## 🔧 How Frontend Connects to Backend

Your React app now has an API service at `src/services/api.js`. Here's how to use it:

### Example: Upload Component

```javascript
import React, { useState } from 'react';
import apiService from '../services/api';

const UploadComponent = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      
      // Send image to backend for OCR processing
      const response = await apiService.uploadPrescription(file);
      
      // Display results
      setResult(response.data);
      console.log('Processed text:', response.data.processedText);
      console.log('Medications found:', response.data.medications);
      
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload}
        disabled={loading}
      />
      
      {loading && <p>Processing prescription...</p>}
      
      {result && (
        <div>
          <h3>Prescription Processed!</h3>
          <p><strong>Original Text:</strong> {result.originalText}</p>
          <p><strong>Processed:</strong> {result.processedText}</p>
          
          <h4>Medications:</h4>
          {result.medications.map((med, index) => (
            <div key={index}>
              <p><strong>{med.name}</strong></p>
              <p>Instructions: {med.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
```

### Example: View Prescriptions

```javascript
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const PrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const response = await apiService.getAllPrescriptions();
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading prescriptions...</p>;

  return (
    <div>
      <h2>Your Prescriptions ({prescriptions.length})</h2>
      {prescriptions.map(prescription => (
        <div key={prescription._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Date:</strong> {new Date(prescription.uploadDate).toLocaleDateString()}</p>
          <p><strong>Processed Text:</strong> {prescription.processedText}</p>
          <p><strong>Medications:</strong> {prescription.medications.length}</p>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionsList;
```

## 🛠️ API Endpoints Available

Your backend provides these endpoints:

- `POST /upload` - Upload prescription image for OCR
- `GET /prescriptions` - Get all prescriptions
- `GET /prescriptions/:id` - Get single prescription
- `DELETE /prescriptions/:id` - Delete prescription
- `GET /` - Health check

## 🔍 Medical Abbreviations Processed

The backend automatically converts:

- **BD** → "Twice a day"
- **OD** → "Once a day"
- **SOS** → "Take when needed"
- **1 TAB** → "Take 1 tablet"
- **AC** → "Before meals"
- **PC** → "After meals"

## 🐛 Troubleshooting

### Backend Won't Start
- Check if MongoDB is running
- Verify Google credentials file exists
- Check port 5000 isn't already in use

### OCR Not Working
- Ensure Google Vision API is enabled
- Check service account permissions
- Verify credentials file path in `.env`

### Frontend Can't Connect
- Make sure backend is running on port 5000
- Check CORS is enabled (it is by default)
- Verify API_BASE_URL in `src/services/api.js`

### MongoDB Issues
- **Local**: Ensure MongoDB service is running
- **Atlas**: Check connection string and network access

## 📁 Project Structure

```
medguide-ai-main/
├── medguide-ai-main/          # React Frontend
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js         # Backend API service
│   │   └── ...
│   └── package.json
├── backend/                   # Node.js Backend
│   ├── server.js             # Main server file
│   ├── package.json          # Dependencies
│   ├── .env                  # Environment variables
│   └── google-credentials.json # Google Cloud key
└── SETUP_GUIDE.md           # This file
```

## 🎉 You're Ready!

Your MedGuideAI app now has:
- ✅ React frontend with modern UI
- ✅ Node.js backend with Express
- ✅ MongoDB database for storage
- ✅ Google Vision OCR for text extraction
- ✅ Medical abbreviation processing
- ✅ Simple API for frontend-backend communication

Start building amazing features! 🚀