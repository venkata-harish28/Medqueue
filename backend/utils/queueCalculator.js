import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

export const calculateWaitTime = async (doctorId, queuePosition) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    const avgConsultTime = doctor.avgConsultTime || 900;
    
    const patientsAhead = queuePosition - 1;
    const baseWaitTime = patientsAhead * avgConsultTime;
    
    return Math.ceil(baseWaitTime / 60); // Convert to minutes
  } catch (error) {
    return 0;
  }
};