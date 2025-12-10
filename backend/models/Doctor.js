import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  languages: [String],
  experience: Number,
  fee: { type: Number, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  avgConsultTime: { type: Number, default: 900 }, // seconds
  description: String,
  rating: { type: Number, default: 4.5 },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Doctor', doctorSchema);