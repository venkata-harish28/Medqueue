import Appointment from '../models/Appointment.js';
import QueueEvent from '../models/QueueEvent.js';

export const getQueueByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const today = new Date().setHours(0, 0, 0, 0);
    
    const queue = await Appointment.find({
      doctorId,
      date: { $gte: today },
      status: { $in: ['booked', 'checked-in'] }
    }).populate('userId', 'name').sort({ queuePosition: 1 });
    
    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markPatientSeen = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: 'completed' },
      { new: true }
    );
    
    // Log event
    await new QueueEvent({
      appointmentId,
      doctorId: appointment.doctorId,
      eventType: 'seen'
    }).save();
    
    // Emit update
    const io = req.app.get('io');
    io.to(`doctor:${appointment.doctorId}`).emit('patient_seen', { appointmentId });
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};