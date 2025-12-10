import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  slots: [{
    time: String,
    isBooked: { type: Boolean, default: false },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Schedule', scheduleSchema);