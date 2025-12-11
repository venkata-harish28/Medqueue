import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';
import User from '../models/User.js';

dotenv.config();

const hospitals = [
  { 
    name: 'City General Hospital', 
    address: '123 Main St, Downtown', 
    departments: ['Cardiology', 'Orthopedics', 'General', 'Emergency'],
    geolocation: { lat: 16.5062, lng: 80.6480 }
  },
  { 
    name: 'Metro Medical Center', 
    address: '456 Park Ave, Uptown', 
    departments: ['Neurology', 'Pediatrics', 'ENT', 'Dermatology'],
    geolocation: { lat: 16.5100, lng: 80.6450 }
  },
  { 
    name: 'Apollo Hospitals', 
    address: '789 Health Road', 
    departments: ['Oncology', 'Cardiology', 'Neurosurgery'],
    geolocation: { lat: 16.5150, lng: 80.6500 }
  }
];

const doctors = [
  { 
    name: 'Dr. Sarah Johnson', 
    specialty: 'Cardiology', 
    experience: 15, 
    fee: 500, 
    rating: 4.8, 
    languages: ['English', 'Spanish'],
    description: 'Specialized in interventional cardiology with 15 years of experience.',
    avgConsultTime: 900,
    available: true
  },
  { 
    name: 'Dr. Michael Chen', 
    specialty: 'Orthopedics', 
    experience: 12, 
    fee: 600, 
    rating: 4.9, 
    languages: ['English', 'Chinese'],
    description: 'Expert in joint replacement and sports injuries.',
    avgConsultTime: 1200,
    available: true
  },
  { 
    name: 'Dr. Priya Sharma', 
    specialty: 'General Physician', 
    experience: 10, 
    fee: 300, 
    rating: 4.7, 
    languages: ['English', 'Hindi', 'Telugu'],
    description: 'General physician with focus on preventive care.',
    avgConsultTime: 600,
    available: true
  },
  { 
    name: 'Dr. James Wilson', 
    specialty: 'Neurology', 
    experience: 20, 
    fee: 800, 
    rating: 4.9, 
    languages: ['English'],
    description: 'Leading neurologist specializing in epilepsy and movement disorders.',
    avgConsultTime: 1500,
    available: true
  },
  { 
    name: 'Dr. Emily Brown', 
    specialty: 'Pediatrics', 
    experience: 8, 
    fee: 400, 
    rating: 4.6, 
    languages: ['English', 'French'],
    description: 'Child health specialist with expertise in developmental disorders.',
    avgConsultTime: 900,
    available: true
  },
  { 
    name: 'Dr. Rajesh Kumar', 
    specialty: 'ENT', 
    experience: 14, 
    fee: 450, 
    rating: 4.7, 
    languages: ['English', 'Hindi', 'Tamil'],
    description: 'ENT surgeon with specialization in sinus and hearing disorders.',
    avgConsultTime: 800,
    available: true
  },
  { 
    name: 'Dr. Lisa Anderson', 
    specialty: 'Dermatology', 
    experience: 9, 
    fee: 550, 
    rating: 4.8, 
    languages: ['English'],
    description: 'Dermatologist focusing on cosmetic and medical dermatology.',
    avgConsultTime: 700,
    available: false
  },
  { 
    name: 'Dr. Ahmed Hassan', 
    specialty: 'General Physician', 
    experience: 7, 
    fee: 350, 
    rating: 4.5, 
    languages: ['English', 'Arabic', 'Urdu'],
    description: 'Primary care physician with holistic approach.',
    avgConsultTime: 600,
    available: true
  }
];

const testUsers = [
  {
    name: 'Test Patient',
    email: 'test@example.com',
    password: 'password123',
    age: 30,
    gender: 'male',
    role: 'patient'
  },
  {
    name: 'Admin User',
    email: 'admin@smartcare.com',
    password: 'admin123',
    age: 35,
    gender: 'female',
    role: 'admin'
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcare');
    console.log('✓ Connected to MongoDB');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    await User.deleteMany({});
    console.log('✓ Cleared existing data');
    
    // Seed hospitals
    console.log('Seeding hospitals...');
    const hospitalDocs = await Hospital.insertMany(hospitals);
    console.log(`✓ Created ${hospitalDocs.length} hospitals`);
    
    // Seed doctors with hospitals
    console.log('Seeding doctors...');
    const doctorsWithHospitals = doctors.map((doc, i) => ({
      ...doc,
      hospitalId: hospitalDocs[i % hospitalDocs.length]._id
    }));
    const doctorDocs = await Doctor.insertMany(doctorsWithHospitals);
    console.log(`✓ Created ${doctorDocs.length} doctors`);
    
    // Seed test users
    console.log('Seeding test users...');
    const userDocs = await User.insertMany(testUsers);
    console.log(`✓ Created ${userDocs.length} test users`);
    
    // Display summary
    console.log('\n=================================');
    console.log('Database seeded successfully! ✓');
    console.log('=================================\n');
    console.log('Test Accounts:');
    console.log('Patient:');
    console.log('  Email: test@example.com');
    console.log('  Password: password123\n');
    console.log('Admin:');
    console.log('  Email: admin@smartcare.com');
    console.log('  Password: admin123\n');
    console.log(`Created ${hospitalDocs.length} hospitals`);
    console.log(`Created ${doctorDocs.length} doctors`);
    console.log(`Created ${userDocs.length} users`);
    console.log('=================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();