// Add a test prescription to database
const mongoose = require('mongoose');

console.log('🧪 Adding Test Prescription to Database...\n');

// Prescription Schema
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

const addTestPrescription = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/medguide');
    console.log('✅ Connected to MongoDB');
    
    // Create test prescription data
    const testPrescription = new Prescription({
      originalText: `Dr. Smith Medical Center
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
- Return if symptoms persist`,
      
      processedText: `Dr. Smith Medical Center
Patient: John Doe
Date: ${new Date().toLocaleDateString()}

Medications:
1. Paracetamol 500mg - Twice a day (Twice daily)
2. Amoxicillin 250mg - Three times a day (Three times daily) 
3. Vitamin D - Once a day (Once daily)
4. Cough Syrup - Take when needed (When needed)

Instructions:
- Take with food
- Complete the course
- Return if symptoms persist`,
      
      medications: [
        {
          name: 'Paracetamol 500mg',
          dosage: '500mg',
          frequency: 'Twice daily',
          instructions: 'Take twice a day with food'
        },
        {
          name: 'Amoxicillin 250mg',
          dosage: '250mg',
          frequency: 'Three times daily',
          instructions: 'Take three times a day after meals'
        },
        {
          name: 'Vitamin D',
          dosage: 'As prescribed',
          frequency: 'Once daily',
          instructions: 'Take once a day'
        },
        {
          name: 'Cough Syrup',
          dosage: 'As needed',
          frequency: 'When needed',
          instructions: 'Take when needed for cough'
        }
      ],
      imageSize: 1024000, // 1MB
      processingTime: 1500 // 1.5 seconds
    });
    
    await testPrescription.save();
    
    console.log('✅ Test prescription added successfully!');
    console.log('Prescription ID:', testPrescription._id);
    console.log('Upload Date:', testPrescription.uploadDate);
    console.log('Medications:', testPrescription.medications.length);
    
    await mongoose.connection.close();
    console.log('\n🎉 Test data added! Now check your database.');
    
  } catch (error) {
    console.error('❌ Failed to add test prescription:', error.message);
  }
};

addTestPrescription();