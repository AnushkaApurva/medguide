// Simple test script to verify backend is working
// Run this with: node test-api.js

const http = require('http');

console.log('🧪 Testing MedGuideAI Backend...\n');

// Test 1: Health Check
const testHealthCheck = () => {
  return new Promise((resolve, reject) => {
    console.log('Test 1: Health Check');
    console.log('Making request to: http://localhost:5000/');
    
    http.get('http://localhost:5000/', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('✅ Health check passed!');
          console.log('Response:', result);
          console.log('');
          resolve();
        } catch (error) {
          console.log('❌ Health check failed - Invalid JSON response');
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.log('❌ Health check failed - Cannot connect to backend');
      console.log('Error:', error.message);
      console.log('');
      console.log('💡 Make sure the backend is running:');
      console.log('   cd backend');
      console.log('   npm run dev');
      reject(error);
    });
  });
};

// Test 2: Get Prescriptions
const testGetPrescriptions = () => {
  return new Promise((resolve, reject) => {
    console.log('Test 2: Get Prescriptions');
    console.log('Making request to: http://localhost:5000/prescriptions');
    
    http.get('http://localhost:5000/prescriptions', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('✅ Get prescriptions passed!');
          console.log(`Found ${result.count} prescriptions in database`);
          console.log('');
          resolve();
        } catch (error) {
          console.log('❌ Get prescriptions failed');
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.log('❌ Get prescriptions failed');
      console.log('Error:', error.message);
      reject(error);
    });
  });
};

// Run all tests
const runTests = async () => {
  try {
    await testHealthCheck();
    await testGetPrescriptions();
    
    console.log('🎉 All tests passed!');
    console.log('');
    console.log('Your backend is working correctly!');
    console.log('You can now connect your frontend to the backend.');
    
  } catch (error) {
    console.log('');
    console.log('⚠️ Some tests failed. Please check the errors above.');
  }
};

runTests();