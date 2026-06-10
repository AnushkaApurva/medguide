// Test all connections: Frontend ↔ Backend ↔ Database
const http = require('http');
const mongoose = require('mongoose');

console.log('🔗 Testing All Connections\n');

// Test 1: Backend API Health Check
const testBackendAPI = () => {
  return new Promise((resolve, reject) => {
    console.log('Test 1: Backend API Health Check');
    console.log('🔄 Testing: http://localhost:5000/');
    
    const req = http.get('http://localhost:5000/', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('✅ Backend API is responding!');
          console.log('Response:', result.message);
          console.log('Status:', result.status);
          resolve(true);
        } catch (error) {
          console.log('❌ Backend API returned invalid JSON');
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Cannot connect to backend API');
      console.log('Error:', error.message);
      console.log('Make sure backend is running on port 5000');
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Backend API request timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
};

// Test 2: Database Connection
const testDatabase = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('\nTest 2: Database Connection');
      console.log('🔄 Testing MongoDB connection...');
      
      await mongoose.connect('mongodb://localhost:27017/medguide');
      console.log('✅ Database connected successfully!');
      console.log('Database name:', mongoose.connection.name);
      
      // Test database operations
      const testSchema = new mongoose.Schema({ 
        test: String, 
        timestamp: { type: Date, default: Date.now } 
      });
      const TestModel = mongoose.model('ConnectionTest', testSchema);
      
      const testDoc = new TestModel({ test: 'Connection test successful' });
      await testDoc.save();
      console.log('✅ Database write test passed');
      
      const foundDoc = await TestModel.findById(testDoc._id);
      console.log('✅ Database read test passed');
      
      await TestModel.deleteOne({ _id: testDoc._id });
      console.log('✅ Database delete test passed');
      
      await mongoose.connection.close();
      resolve(true);
    } catch (error) {
      console.log('❌ Database connection failed');
      console.log('Error:', error.message);
      reject(error);
    }
  });
};

// Test 3: Backend Database API
const testBackendDatabase = () => {
  return new Promise((resolve, reject) => {
    console.log('\nTest 3: Backend Database API');
    console.log('🔄 Testing: http://localhost:5000/prescriptions');
    
    const req = http.get('http://localhost:5000/prescriptions', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('✅ Backend database API is working!');
          console.log('Prescriptions count:', result.count);
          console.log('Success:', result.success);
          resolve(true);
        } catch (error) {
          console.log('❌ Backend database API returned invalid JSON');
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Cannot connect to backend database API');
      console.log('Error:', error.message);
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Backend database API request timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
};

// Test 4: Frontend Accessibility
const testFrontend = () => {
  return new Promise((resolve, reject) => {
    console.log('\nTest 4: Frontend Accessibility');
    console.log('🔄 Testing: http://localhost:8081/');
    
    const req = http.get('http://localhost:8081/', (res) => {
      console.log('✅ Frontend is accessible!');
      console.log('Status code:', res.statusCode);
      console.log('Content type:', res.headers['content-type']);
      resolve(true);
    });
    
    req.on('error', (error) => {
      console.log('❌ Cannot connect to frontend');
      console.log('Error:', error.message);
      console.log('Make sure frontend is running on port 8081');
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Frontend request timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
};

// Run all tests
const runAllTests = async () => {
  console.log('🚀 Starting Connection Tests\n');
  
  const tests = [
    { name: 'Backend API', test: testBackendAPI },
    { name: 'Database', test: testDatabase },
    { name: 'Backend Database API', test: testBackendDatabase },
    { name: 'Frontend', test: testFrontend }
  ];
  
  const results = {};
  
  for (const { name, test } of tests) {
    try {
      await test();
      results[name] = '✅ PASS';
    } catch (error) {
      results[name] = '❌ FAIL';
    }
  }
  
  console.log('\n📊 Connection Test Results:');
  console.log('================================');
  Object.entries(results).forEach(([name, result]) => {
    console.log(`${name}: ${result}`);
  });
  
  const allPassed = Object.values(results).every(result => result.includes('PASS'));
  
  if (allPassed) {
    console.log('\n🎉 ALL CONNECTIONS ARE WORKING!');
    console.log('✅ Frontend ↔ Backend ↔ Database');
    console.log('\nYour MedGuideAI is fully connected and ready to use!');
    console.log('\nNext steps:');
    console.log('1. Open: http://localhost:8081 (Frontend)');
    console.log('2. Test uploading a prescription image');
    console.log('3. Check results are saved in database');
  } else {
    console.log('\n⚠️ Some connections failed. Check the errors above.');
  }
};

runAllTests().catch(console.error);