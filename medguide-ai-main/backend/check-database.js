// Simple script to check database contents
const mongoose = require('mongoose');

console.log('🔍 Checking MedGuideAI Database...\n');

// Prescription Schema (same as in server.js)
const prescriptionSchema = new mongoose.Schema({
  originalText: String,
  processedText: String,
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

const checkDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect('mongodb://localhost:27017/medguide');
    console.log('✅ Connected to MongoDB\n');
    
    // Get all prescriptions
    const prescriptions = await Prescription.find().sort({ uploadDate: -1 });
    
    console.log(`📊 Database Statistics:`);
    console.log(`Total Prescriptions: ${prescriptions.length}`);
    
    if (prescriptions.length === 0) {
      console.log('\n📋 No prescriptions found in database.');
      console.log('💡 Upload a prescription through your app to see data here!');
    } else {
      // Calculate stats
      const totalMedications = prescriptions.reduce((sum, p) => sum + (p.medications?.length || 0), 0);
      const avgProcessingTime = prescriptions.reduce((sum, p) => sum + (p.processingTime || 0), 0) / prescriptions.length;
      
      console.log(`Total Medications: ${totalMedications}`);
      console.log(`Average Processing Time: ${Math.round(avgProcessingTime)}ms`);
      console.log(`\n📋 Recent Prescriptions:\n`);
      
      // Show recent prescriptions
      prescriptions.slice(0, 5).forEach((prescription, index) => {
        console.log(`${index + 1}. Prescription ID: ${prescription._id}`);
        console.log(`   Upload Date: ${prescription.uploadDate.toLocaleString()}`);
        console.log(`   Medications: ${prescription.medications?.length || 0}`);
        console.log(`   Processing Time: ${prescription.processingTime || 0}ms`);
        
        if (prescription.originalText) {
          const preview = prescription.originalText.substring(0, 100);
          console.log(`   Text Preview: "${preview}${prescription.originalText.length > 100 ? '...' : ''}"`);
        }
        
        if (prescription.medications && prescription.medications.length > 0) {
          console.log(`   Medications:`);
          prescription.medications.forEach((med, medIndex) => {
            console.log(`     ${medIndex + 1}. ${med.name} - ${med.instructions}`);
          });
        }
        console.log('');
      });
      
      if (prescriptions.length > 5) {
        console.log(`... and ${prescriptions.length - 5} more prescriptions\n`);
      }
    }
    
    // Show collections info
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Database Collections:`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✅ Database check completed!');
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. MongoDB service is running');
    console.log('2. Database connection string is correct');
    console.log('3. Backend server has been started at least once');
  }
};

checkDatabase();