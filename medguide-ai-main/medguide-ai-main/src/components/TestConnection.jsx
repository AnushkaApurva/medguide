// Simple component to test backend connection
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const TestConnection = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [prescriptions, setPrescriptions] = useState([]);
  const [uploadTest, setUploadTest] = useState(null);

  // Test backend connection on component mount
  useEffect(() => {
    testBackendConnection();
    loadPrescriptions();
  }, []);

  const testBackendConnection = async () => {
    try {
      const result = await apiService.healthCheck();
      setBackendStatus('connected');
      console.log('Backend connected:', result);
    } catch (error) {
      setBackendStatus('failed');
      console.error('Backend connection failed:', error);
    }
  };

  const loadPrescriptions = async () => {
    try {
      const result = await apiService.getAllPrescriptions();
      setPrescriptions(result.data);
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
    }
  };

  const testUpload = async () => {
    try {
      setUploadTest('uploading');
      
      // Create a mock file for testing
      const mockFile = new File(['mock prescription image'], 'test.jpg', {
        type: 'image/jpeg'
      });
      
      const result = await apiService.uploadPrescription(mockFile);
      setUploadTest('success');
      
      // Reload prescriptions to show the new one
      loadPrescriptions();
      
      console.log('Upload test successful:', result);
    } catch (error) {
      setUploadTest('failed');
      console.error('Upload test failed:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return '#4CAF50';
      case 'failed': return '#f44336';
      case 'checking': return '#ff9800';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return '✅ Connected';
      case 'failed': return '❌ Failed';
      case 'checking': return '🔄 Checking...';
      default: return '❓ Unknown';
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>🧪 MedGuideAI Connection Test</h1>
      
      {/* Backend Status */}
      <div style={{ 
        border: '2px solid #ddd', 
        borderRadius: '8px', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>Backend Connection</h2>
        <p style={{ 
          color: getStatusColor(backendStatus),
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Status: {getStatusText(backendStatus)}
        </p>
        
        {backendStatus === 'failed' && (
          <div style={{ color: '#f44336', marginTop: '10px' }}>
            <p>❌ Cannot connect to backend server</p>
            <p>Make sure:</p>
            <ul>
              <li>Backend server is running (npm run dev)</li>
              <li>Server is on port 5000</li>
              <li>No firewall blocking the connection</li>
            </ul>
          </div>
        )}
        
        {backendStatus === 'connected' && (
          <div style={{ color: '#4CAF50', marginTop: '10px' }}>
            <p>✅ Backend server is running correctly!</p>
            <p>API URL: http://localhost:5000</p>
          </div>
        )}
      </div>

      {/* Database Status */}
      <div style={{ 
        border: '2px solid #ddd', 
        borderRadius: '8px', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>Database Connection</h2>
        <p>Total Prescriptions: <strong>{prescriptions.length}</strong></p>
        
        {prescriptions.length > 0 && (
          <div>
            <h3>Recent Prescriptions:</h3>
            {prescriptions.slice(0, 3).map((prescription, index) => (
              <div key={prescription._id} style={{ 
                border: '1px solid #ccc', 
                padding: '10px', 
                margin: '5px 0',
                borderRadius: '4px'
              }}>
                <p><strong>#{index + 1}</strong></p>
                <p><strong>Date:</strong> {new Date(prescription.uploadDate).toLocaleString()}</p>
                <p><strong>Processing Time:</strong> {prescription.processingTime}ms</p>
                <p><strong>Medications:</strong> {prescription.medications.length}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Test */}
      <div style={{ 
        border: '2px solid #ddd', 
        borderRadius: '8px', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>Upload Test</h2>
        <button 
          onClick={testUpload}
          disabled={uploadTest === 'uploading' || backendStatus !== 'connected'}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: backendStatus === 'connected' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: backendStatus === 'connected' ? 'pointer' : 'not-allowed'
          }}
        >
          {uploadTest === 'uploading' ? '🔄 Testing Upload...' : '🧪 Test Upload'}
        </button>
        
        {uploadTest === 'success' && (
          <div style={{ color: '#4CAF50', marginTop: '10px' }}>
            <p>✅ Upload test successful!</p>
            <p>Mock prescription was processed and saved to database.</p>
          </div>
        )}
        
        {uploadTest === 'failed' && (
          <div style={{ color: '#f44336', marginTop: '10px' }}>
            <p>❌ Upload test failed!</p>
            <p>Check the browser console for error details.</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{ 
        border: '2px solid #2196F3', 
        borderRadius: '8px', 
        padding: '15px', 
        backgroundColor: '#e3f2fd'
      }}>
        <h2>📋 Next Steps</h2>
        {backendStatus === 'connected' ? (
          <div>
            <p>✅ Your setup is working! You can now:</p>
            <ul>
              <li>Use the upload functionality in your app</li>
              <li>View saved prescriptions</li>
              <li>Add Google Vision API for real OCR</li>
            </ul>
          </div>
        ) : (
          <div>
            <p>⚠️ Setup incomplete. Please:</p>
            <ol>
              <li>Make sure MongoDB is connected (check backend logs)</li>
              <li>Start backend server: <code>cd backend && npm run dev</code></li>
              <li>Refresh this page to test again</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestConnection;