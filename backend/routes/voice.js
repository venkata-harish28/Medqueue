import express from 'express';
import { processVoiceIntent } from '../controllers/voiceController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/intent', auth, processVoiceIntent);

export default router;