import mongoose from 'mongoose';

const queueEventSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  eventType: {
    type: String,
    enum: ['joined', 'called', 'seen', 'delay'],
    required: true
  },
  timestamp: { type: Date, default: Date.now },
  delayMinutes: Number
});

export default mongoose.model('QueueEvent', queueEventSchema);