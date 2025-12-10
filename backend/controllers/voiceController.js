import axios from 'axios';
import { recommendDoctorBySymptoms } from '../utils/recommendation.js';

export const processVoiceIntent = async (req, res) => {
  try {
    const { text } = req.body;
    
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a medical appointment assistant. Analyze this patient request and extract:
- intent: "book_appointment", "ask_waiting_time", "recommend_doctor", "greeting", "cancel_appointment"
- symptoms (if mentioned)
- specialty (if mentioned)
- urgency level

Patient said: "${text}"

Respond in JSON format only.`
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const aiText = response.data.content[0].text;
    const cleanJson = aiText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    
    let reply = '';
    let data = {};
    
    if (parsed.intent === 'recommend_doctor' && parsed.symptoms) {
      const recommendation = await recommendDoctorBySymptoms(parsed.symptoms);
      reply = `Based on your symptoms, I recommend ${recommendation.doctor.name}, a ${recommendation.doctor.specialty}. ${recommendation.reasoning}`;
      data.doctorId = recommendation.doctor._id;
    } else if (parsed.intent === 'greeting') {
      reply = 'Hello! I\'m your SmartCare AI assistant. How can I help you today?';
    } else if (parsed.intent === 'book_appointment') {
      reply = 'I can help you book an appointment. Let me find available doctors for you.';
    } else {
      reply = 'I\'m here to help with appointments and doctor recommendations. How can I assist you?';
    }
    
    res.json({ intent: parsed.intent, reply, data });
  } catch (error) {
    console.error('Voice intent error:', error);
    res.status(500).json({ error: error.message });
  }
};