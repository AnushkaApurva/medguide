# MedGuideAI Backend

Simple Node.js backend for processing prescription images using OCR and storing data in MongoDB.

## Features

- 📷 **Image Upload**: Accept prescription images from frontend
- 🔍 **OCR Processing**: Extract text using Google Vision API
- 💊 **Medical Text Processing**: Convert abbreviations (BD → Twice a day, etc.)
- 💾 **Database Storage**: Save prescriptions and processed data in MongoDB
- 🌐 **CORS Enabled**: Ready for frontend connection
- ⚡ **Simple API**: Easy-to-use REST endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose)
- **Google Vision API** - OCR text extraction
- **Multer** - File upload handling

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medguide
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
NODE_ENV=development
```

### 3. Set Up Google Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Vision API
4. Create a service account and download the JSON key file
5. Save the JSON file as `google-credentials.json` in the backend folder

### 4. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB on your computer
- Start MongoDB service
- Use: `MONGODB_URI=mongodb://localhost:27017/medguide`

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get connection string
- Use: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medguide`

### 5. Start the Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### 📤 Upload Prescription
```
POST /upload
Content-Type: multipart/form-data
Body: prescription (image file)
```

**Response:**
```json
{
  "success": true,
  "message": "Prescription processed successfully!",
  "data": {
    "id": "prescription_id",
    "originalText": "Raw OCR text...",
    "processedText": "Processed text with explanations...",
    "medications": [
      {
        "name": "Medicine Name",
        "dosage": "As prescribed",
        "frequency": "As directed",
        "instructions": "Take twice a day"
      }
    ],
    "processingTime": 1500
  }
}
```

### 📋 Get All Prescriptions
```
GET /prescriptions
```

### 📄 Get Single Prescription
```
GET /prescriptions/:id
```

### 🗑️ Delete Prescription
```
DELETE /prescriptions/:id
```

## Medical Abbreviations Processed

The backend automatically converts common medical abbreviations:

- **BD** → Twice a day
- **OD** → Once a day  
- **TID** → Three times a day
- **QID** → Four times a day
- **SOS** → Take when needed
- **1 TAB** → Take 1 tablet
- **2 TAB** → Take 2 tablets
- **AC** → Before meals
- **PC** → After meals
- **HS** → At bedtime

## Error Handling

The backend includes comprehensive error handling:

- File upload validation
- OCR processing errors
- Database connection issues
- Invalid requests
- User-friendly error messages

## Development Tips

1. **Check Logs**: The server logs all operations with emojis for easy reading
2. **Test OCR**: Use clear, high-quality prescription images for best results
3. **Database**: Use MongoDB Compass to view stored data
4. **CORS**: Already configured for frontend connection

## Troubleshooting

### Common Issues

**1. Google Vision API Error**
- Check if Vision API is enabled in Google Cloud Console
- Verify service account JSON file path
- Ensure proper permissions on service account

**2. MongoDB Connection Error**
- Check if MongoDB is running (local setup)
- Verify connection string format
- Check network access (Atlas setup)

**3. File Upload Issues**
- Check file size (5MB limit)
- Ensure proper Content-Type header
- Verify multer configuration

**4. CORS Issues**
- Backend has CORS enabled by default
- Check if frontend is making requests to correct port

## Next Steps

To connect this backend to your React frontend:

1. Install axios in frontend: `npm install axios`
2. Create API service file
3. Update upload component to send images to `/upload`
4. Display processed results from backend response

Example frontend code:
```javascript
// In your React component
const uploadPrescription = async (file) => {
  const formData = new FormData();
  formData.append('prescription', file);
  
  const response = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  console.log(result);
};
```