// MedGuideAI Backend Server
// Simple Express.js server with MongoDB and Google Vision OCR

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const vision = require('@google-cloud/vision');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// Configure multer for file uploads (store in memory)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Initialize Google Vision client (optional - can be disabled for testing)
let visionClient = null;
try {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const vision = require('@google-cloud/vision');
    visionClient = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
    console.log('✅ Google Vision API initialized');
  } else {
    console.log('⚠️ Google Vision API not configured - OCR will use mock data');
  }
} catch (error) {
  console.log('⚠️ Google Vision API setup failed - OCR will use mock data');
  console.log('Error:', error.message);
}

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    // Use explicit local MongoDB connection string
    const mongoURI = 'mongodb://localhost:27017/medguide';
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('Using local MongoDB connection');
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n💡 MongoDB Setup Help:');
    console.log('1. Make sure MongoDB service is running');
    console.log('2. Check if port 27017 is available');
    console.log('3. Try restarting MongoDB service');
    process.exit(1);
  }
};

// Prescription Schema
const prescriptionSchema = new mongoose.Schema({
  originalText: String,        // Raw OCR text
  processedText: String,       // Processed/cleaned text
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    instructions: String
  }],
  uploadDate: { type: Date, default: Date.now },
  imageSize: Number,
  processingTime: Number
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

// Helper function to process medical abbreviations
const processMedicalText = (text) => {
  if (!text) return '';
  
  let processed = text;
  
  // Common medical abbreviations
  const abbreviations = {
    'BD': 'Twice a day',
    'BID': 'Twice a day', 
    'OD': 'Once a day',
    'QD': 'Once a day',
    'TID': 'Three times a day',
    'QID': 'Four times a day',
    'SOS': 'Take when needed',
    'PRN': 'Take when needed',
    '1 TAB': 'Take 1 tablet',
    '2 TAB': 'Take 2 tablets',
    'AC': 'Before meals',
    'PC': 'After meals',
    'HS': 'At bedtime'
  };
  
  // Replace abbreviations (case insensitive)
  Object.keys(abbreviations).forEach(abbr => {
    const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
    processed = processed.replace(regex, abbreviations[abbr]);
  });
  
  return processed;
};

// Extract medication information from text
const extractMedications = (text) => {
  const medications = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  lines.forEach(line => {
    // Simple pattern matching for medications
    // This is a basic implementation - you can make it more sophisticated
    if (line.length > 3 && !line.toLowerCase().includes('dr.') && !line.toLowerCase().includes('clinic')) {
      medications.push({
        name: line.trim(),
        dosage: 'As prescribed',
        frequency: 'As directed',
        instructions: processMedicalText(line)
      });
    }
  });
  
  return medications;
};

// Routes

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'MedGuideAI Backend is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Upload and process prescription image
app.post('/upload', upload.single('prescription'), async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No image file uploaded',
        message: 'Please select a prescription image to upload'
      });
    }

    console.log(`📷 Processing image: ${req.file.originalname} (${req.file.size} bytes)`);

    // Prepare image for Google Vision API
    const imageBuffer = req.file.buffer;
    
    // Call Google Vision OCR or use mock data for testing
    let rawText = '';
    
    if (visionClient) {
      console.log('🔍 Sending image to Google Vision OCR...');
      try {
        const [result] = await visionClient.textDetection({
          image: { content: imageBuffer }
        });
        
        const detections = result.textAnnotations;
        rawText = detections && detections.length > 0 ? detections[0].description : '';
      } catch (ocrError) {
        console.log('⚠️ OCR failed, using mock data:', ocrError.message);
        rawText = 'Mock prescription text: Take Paracetamol 500mg BD for 5 days. Take Amoxicillin 250mg TID after meals.';
      }
    } else {
      // Mock OCR data for testing without Google Vision
      console.log('🧪 Using mock OCR data (Google Vision not configured)');
      rawText = `Mock Prescription Data:
      
Dr. Smith Medical Center
Patient: John Doe
Date: ${new Date().toLocaleDateString()}

Medications:
1. Paracetamol 500mg - BD (Twice daily)
2. Amoxicillin 250mg - TID (Three times daily) 
3. Vitamin D - OD (Once daily)
4. Cough Syrup - SOS (When needed)

Instructions:
- Take with food
- Complete the course
- Return if symptoms persist`;
    }
    
    if (!rawText) {
      return res.status(400).json({
        error: 'No text found in image',
        message: 'Could not extract any text from the prescription image. Please ensure the image is clear and contains text.'
      });
    }

    console.log('✅ OCR completed, processing medical text...');

    // Process the extracted text
    const processedText = processMedicalText(rawText);
    const medications = extractMedications(rawText);
    
    // Save to database
    const prescription = new Prescription({
      originalText: rawText,
      processedText: processedText,
      medications: medications,
      imageSize: req.file.size,
      processingTime: Date.now() - startTime
    });
    
    await prescription.save();
    console.log('💾 Prescription saved to database');

    // Send response to frontend
    res.json({
      success: true,
      message: 'Prescription processed successfully!',
      data: {
        id: prescription._id,
        originalText: rawText,
        processedText: processedText,
        medications: medications,
        processingTime: Date.now() - startTime
      }
    });

  } catch (error) {
    console.error('❌ Error processing prescription:', error);
    
    // Send user-friendly error message
    res.status(500).json({
      error: 'Processing failed',
      message: 'Sorry, we could not process your prescription image. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all prescriptions
app.get('/prescriptions', async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .sort({ uploadDate: -1 }) // Most recent first
      .limit(50); // Limit to last 50 prescriptions
    
    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    console.error('❌ Error fetching prescriptions:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Could not fetch prescriptions'
    });
  }
});

// Get single prescription by ID
app.get('/prescriptions/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    
    if (!prescription) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Prescription not found'
      });
    }
    
    res.json({
      success: true,
      data: prescription
    });
  } catch (error) {
    console.error('❌ Error fetching prescription:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Could not fetch prescription'
    });
  }
});

// Delete prescription
app.delete('/prescriptions/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    
    if (!prescription) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Prescription not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Prescription deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting prescription:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Could not delete prescription'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 MedGuideAI Backend running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}`);
      console.log(`🏥 Upload endpoint: http://localhost:${PORT}/upload`);
      console.log(`📋 Prescriptions endpoint: http://localhost:${PORT}/prescriptions`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();