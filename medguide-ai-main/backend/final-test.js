// Final MongoDB test with explicit connection string
const mongoose = require('mongoose');

console.log('🧪 Final MongoDB Connection Test\n');

// Use explicit connection string
const MONGODB_URI = 'mongodb://localhost:27017/medguide';

const testConnection = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('Connection string:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ MongoDB connection successful!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ 
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const testDoc = new TestModel({ 
      message: 'MedGuideAI backend is working!' 
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully');
    console.log('Document ID:', testDoc._id);
    
    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    
    console.log('\n🎉 All tests passed! MongoDB is working correctly.');
    console.log('Your backend is ready to run!');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure MongoDB service is running');
    console.log('2. Check if port 27017 is available');
    console.log('3. Try restarting MongoDB service');
  }
};

testConnection();