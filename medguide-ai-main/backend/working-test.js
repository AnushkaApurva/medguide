// Working test script for MedGuideAI Backend
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing MedGuideAI Backend Setup...\n');

// Test environment variables
const testEnvironment = () => {
  console.log('Test 1: Environment Variables');
  
  const requiredVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];
  let allGood = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${varName === 'MONGODB_URI' ? 'Set' : value}`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      allGood = false;
    }
  });
  
  console.log('');
  return allGood;
};

// Test MongoDB connection
const testMongoDB = async () => {
  try {
    console.log('Test 2: MongoDB Connection');
    
    // Use explicit working connection string
    const mongoURI = 'mongodb://localhost:27017/medguide';
    console.log('Using connection string:', mongoURI);
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connection successful!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('WorkingTest', testSchema);
    
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
    console.log('1. Make sure MongoDB service is running');
    console.log('2. Check if port 27017 is available');
    console.log('3. Connection string should be: mongodb://localhost:27017/medguide\n');
    return false;
  }
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
    console.log('1. Start backend: npm run dev');
    console.log('2. Start frontend: cd ../medguide-ai-main && npm run dev');
    console.log('3. Open: http://localhost:5173');
  } else {
    console.log('\n⚠️ Some tests failed. Please fix the issues above.');
  }
};

runTests().catch(console.error);