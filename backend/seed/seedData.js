import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';

dotenv.config();

const hospitals = [
  { name: 'City General Hospital', address: '123 Main St', departments: ['Cardiology', 'Orthopedics', 'General'] },
  { name: 'Metro Medical Center', address: '456 Park Ave', departments: ['Neurology', 'Pediatrics', 'ENT'] }
];

const doctors = [
  { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', experience: 15, fee: 500, rating: 4.8, languages: ['English', 'Spanish'] },
  { name: 'Dr. Michael Chen', specialty: 'Orthopedics', experience: 12, fee: 600, rating: 4.9, languages: ['English', 'Chinese'] },
  { name: 'Dr. Priya Sharma', specialty: 'General Physician', experience: 10, fee: 300, rating: 4.7, languages: ['English', 'Hindi'] },
  { name: 'Dr. James Wilson', specialty: 'Neurology', experience: 20, fee: 800, rating: 4.9, languages: ['English'] },
  { name: 'Dr. Emily Brown', specialty: 'Pediatrics', experience: 8, fee: 400, rating: 4.6, languages: ['English'] }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcare');
    
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    
    const hospitalDocs = await Hospital.insertMany(hospitals);
    
    const doctorsWithHospitals = doctors.map((doc, i) => ({
      ...doc,
      hospitalId: hospitalDocs[i % hospitalDocs.length]._id
    }));
    
    await Doctor.insertMany(doctorsWithHospitals);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();