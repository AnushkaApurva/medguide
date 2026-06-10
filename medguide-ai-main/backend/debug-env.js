// Debug environment variables
require('dotenv').config();

console.log('🔍 Debugging Environment Variables\n');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('Length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
console.log('Type:', typeof process.env.MONGODB_URI);
console.log('\nCharacter codes:');
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  console.log('First 50 chars:', uri.substring(0, 50));
  console.log('Last 50 chars:', uri.substring(uri.length - 50));
}