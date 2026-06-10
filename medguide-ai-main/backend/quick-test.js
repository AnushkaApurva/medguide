// Quick test script to verify backend setup
// Run with: node quick-test.js

const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing MedGuideAI Backend Setup...\n');

// Test MongoDB connection
const testMongoDB = async () => {
  try {
    console.log('Test 1: MongoDB Connection');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Found' : 'Missing');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env file');
    }
    
    console.log('🔄 Connecting to MongoDB...');
    
    // Close any existing connections first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB connection successful!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('TestDoc', testSchema);
    
    const testDoc = new TestModel({ test: 'Hello from MedGuideAI!' });
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed\n');
    
    return true;
  } catch (error) {
    console.log('❌ MongoDB test failed:', error.message);
    console.log('\n💡 MongoDB Setup Help:');
    console.log('1. Check your .env file has MONGODB_URI');
    console.log('2. Verify your MongoDB Atlas connection string');
    console.log('3. Make sure your IP is whitelisted in Atlas');
    console.log('4. Check username/password in connection string\n');
    return false;
  }
};

// Test environment variables
const testEnvironment = () => {
  console.log('Test 2: Environment Variables');
  
  const requiredVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];
  let allGood = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${varName === 'MONGODB_URI' ? 'Set (hidden)' : value}`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      allGood = false;
    }
  });
  
  // Optional variables
  const optionalVars = ['GOOGLE_APPLICATION_CREDENTIALS'];
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: Set (optional)`);
    } else {
      console.log(`⚠️ ${varName}: Not set (OCR will use mock data)`);
    }
  });
  
  console.log('');
  return allGood;
};

// Run all tests
const runTests = async () => {
  console.log('🚀 Starting MedGuideAI Backend Tests\n');
  
  const envTest = testEnvironment();
  const mongoTest = await testMongoDB();
  
  console.log('📊 Test Results:');
  console.log(`Environment Variables: ${envTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`MongoDB Connection: ${mongoTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (envTest && mongoTest) {
    console.log('\n🎉 All tests passed! Your backend is ready to run.');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:5000');
    console.log('3. Test the API endpoints');
  } else {
    console.log('\n⚠️ Some tests failed. Please fix the issues above.');
  }
};

runTests().catch(console.error);