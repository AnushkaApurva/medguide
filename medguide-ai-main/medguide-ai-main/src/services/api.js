// MedGuideAI API Service
// Simple service to connect React frontend with Node.js backend

const API_BASE_URL = 'http://localhost:5000';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// API Service object
const apiService = {
  
  // Upload prescription image for OCR processing
  uploadPrescription: async (imageFile) => {
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('prescription', imageFile);
      
      console.log('📤 Uploading prescription image...');
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      });
      
      const result = await handleResponse(response);
      console.log('✅ Upload successful:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Upload failed:', error.message);
      throw error;
    }
  },
  
  // Get all prescriptions from database
  getAllPrescriptions: async () => {
    try {
      console.log('📋 Fetching all prescriptions...');
      
      const response = await fetch(`${API_BASE_URL}/prescriptions`);
      const result = await handleResponse(response);
      
      console.log(`✅ Found ${result.count} prescriptions`);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch prescriptions:', error.message);
      throw error;
    }
  },
  
  // Get single prescription by ID
  getPrescription: async (prescriptionId) => {
    try {
      console.log(`📄 Fetching prescription ${prescriptionId}...`);
      
      const response = await fetch(`${API_BASE_URL}/prescriptions/${prescriptionId}`);
      const result = await handleResponse(response);
      
      console.log('✅ Prescription found:', result.data);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch prescription:', error.message);
      throw error;
    }
  },
  
  // Delete prescription by ID
  deletePrescription: async (prescriptionId) => {
    try {
      console.log(`🗑️ Deleting prescription ${prescriptionId}...`);
      
      const response = await fetch(`${API_BASE_URL}/prescriptions/${prescriptionId}`, {
        method: 'DELETE'
      });
      
      const result = await handleResponse(response);
      console.log('✅ Prescription deleted');
      
      return result;
    } catch (error) {
      console.error('❌ Failed to delete prescription:', error.message);
      throw error;
    }
  },
  
  // Check if backend is running
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      const result = await handleResponse(response);
      
      console.log('✅ Backend is healthy:', result);
      return result;
    } catch (error) {
      console.error('❌ Backend health check failed:', error.message);
      throw error;
    }
  }
};

export default apiService;

// Example usage in React components:
/*

import apiService from '../services/api';

// In your upload component:
const handleFileUpload = async (file) => {
  try {
    setLoading(true);
    const result = await apiService.uploadPrescription(file);
    
    // Handle success
    console.log('Processed text:', result.data.processedText);
    console.log('Medications:', result.data.medications);
    
  } catch (error) {
    // Handle error
    alert('Upload failed: ' + error.message);
  } finally {
    setLoading(false);
  }
};

// In your prescriptions list component:
const loadPrescriptions = async () => {
  try {
    const result = await apiService.getAllPrescriptions();
    setPrescriptions(result.data);
  } catch (error) {
    console.error('Failed to load prescriptions:', error);
  }
};

*/