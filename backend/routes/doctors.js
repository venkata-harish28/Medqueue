import express from 'express';
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor } from '../controllers/doctorController.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/', auth, adminOnly, createDoctor);
router.put('/:id', auth, adminOnly, updateDoctor);

export default router;