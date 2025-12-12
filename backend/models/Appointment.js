// backend/models/Appointment.js
import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['booked', 'checked-in', 'in-progress', 'completed', 'cancelled'], 
    default: 'booked' 
  },
  tokenNumber: { type: String, required: true },
  queuePosition: { type: Number },
  estimatedWaitTime: { type: Number }, // in minutes
  symptoms: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', AppointmentSchema);