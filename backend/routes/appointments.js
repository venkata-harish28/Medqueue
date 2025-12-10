import express from 'express';
import { createAppointment, getUserAppointments, cancelAppointment } from '../controllers/appointmentController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/my', auth, getUserAppointments);
router.patch('/:id/cancel', auth, cancelAppointment);

export default router;