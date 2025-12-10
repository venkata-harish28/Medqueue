import express from 'express';
import { getQueueByDoctor, markPatientSeen } from '../controllers/queueController.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/doctor/:doctorId', auth, getQueueByDoctor);
router.patch('/seen/:appointmentId', auth, adminOnly, markPatientSeen);

export default router;