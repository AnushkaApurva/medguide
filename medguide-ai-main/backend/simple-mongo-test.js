// Simple MongoDB connection test
const mongoose = require('mongoose');

console.log('🧪 Simple MongoDB Test');

// Test different connection strings
const testConnections = [
  'mongodb://localhost:27017/medguide',
  'mongodb://127.0.0.1:27017/medguide',
  'mongodb://localhost:27017'
];

const testConnection = async (uri) => {
  try {
    console.log(`\n🔄 Testing: ${uri}`);
    await mongoose.connect(uri);
    console.log('✅ Connection successful!');
    console.log(`📍 Database: ${mongoose.connection.name || 'default'}`);
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    return false;
  }
};

const runTests = async () => {
  for (const uri of testConnections) {
    const success = await testConnection(uri);
    if (success) {
      console.log(`\n🎉 Working connection string: ${uri}`);
      break;
    }
  }
};

runTests().catch(console.error);