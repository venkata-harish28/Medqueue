import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
  date: { type: Date, required: true },
  time: String,
  tokenNumber: String,
  symptoms: String,
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'completed', 'cancelled'],
    default: 'booked'
  },
  queuePosition: Number,
  estimatedWaitTime: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);