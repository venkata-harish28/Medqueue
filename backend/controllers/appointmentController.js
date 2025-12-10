import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Schedule from '../models/Schedule.js';
import { calculateWaitTime } from '../utils/queueCalculator.js';

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, symptoms } = req.body;
    const doctor = await Doctor.findById(doctorId);
    
    // Generate token number
    const todayAppointments = await Appointment.countDocuments({
      doctorId,
      date: { $gte: new Date(date).setHours(0, 0, 0, 0) }
    });
    const tokenNumber = `${doctor.name.substring(0, 1).toUpperCase()}${String(todayAppointments + 1).padStart(3, '0')}`;
    
    // Calculate queue position and wait time
    const queuePosition = todayAppointments + 1;
    const estimatedWaitTime = await calculateWaitTime(doctorId, queuePosition);
    
    const appointment = new Appointment({
      userId: req.user._id,
      doctorId,
      date,
      time,
      tokenNumber,
      symptoms,
      queuePosition,
      estimatedWaitTime
    });
    
    await appointment.save();
    
    // Emit socket event
    const io = req.app.get('io');
    io.to(`doctor:${doctorId}`).emit('queue_updated', {
      doctorId,
      queuePosition,
      tokenNumber
    });
    
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('doctorId')
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};