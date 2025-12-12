// models/Appointment.js
const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  slot: Date,           // scheduled start time
  durationMins: Number, // estimated duration
  status: { type: String, enum: ['scheduled','checked_in','in_consult','completed','cancelled'], default: 'scheduled' },
  tokenNumber: Number,  // digital token in queue
  createdAt: { type: Date, default: Date.now },
  notes: String
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
