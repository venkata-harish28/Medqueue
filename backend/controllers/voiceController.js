import axios from 'axios';
import { recommendDoctorBySymptoms } from '../utils/recommendation.js';

export const processVoiceIntent = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('Processing voice command:', text);

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a medical appointment assistant. Analyze this patient request and extract:
- intent: "book_appointment", "ask_waiting_time", "recommend_doctor", "greeting", "cancel_appointment", "find_doctor"
- symptoms (if mentioned)
- specialty (if mentioned)  
- urgency level (low/medium/high)

Patient said: "${text}"

Respond in JSON format only with these exact fields:
{
  "intent": "string",
  "symptoms": "string or null",
  "specialty": "string or null",
  "urgency": "string"
}`
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          }
        }
      );
      
      const aiText = response.data.content[0].text;
      const cleanJson = aiText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      let reply = '';
      let data = {};
      
      // Handle different intents
      switch (parsed.intent) {
        case 'recommend_doctor':
          if (parsed.symptoms) {
            const recommendation = await recommendDoctorBySymptoms(parsed.symptoms);
            if (recommendation.doctor) {
              reply = `Based on your symptoms, I recommend ${recommendation.doctor.name}, a ${recommendation.doctor.specialty}. ${recommendation.reasoning}`;
              data.doctorId = recommendation.doctor._id;
            } else {
              reply = 'I couldn\'t find a suitable doctor right now. Please try searching by specialty.';
            }
          } else {
            reply = 'Could you describe your symptoms so I can recommend the right doctor?';
          }
          break;
          
        case 'greeting':
          reply = 'Hello! I\'m your SmartCare AI assistant. I can help you book appointments, find doctors, or answer questions about wait times. How can I assist you today?';
          break;
          
        case 'book_appointment':
          reply = 'I can help you book an appointment. Let me show you available doctors.';
          data.action = 'navigate_to_doctors';
          break;
          
        case 'find_doctor':
          if (parsed.specialty) {
            reply = `I'll help you find ${parsed.specialty} doctors. Let me show you the available specialists.`;
            data.specialty = parsed.specialty;
            data.action = 'navigate_to_doctors';
          } else {
            reply = 'What type of doctor are you looking for? For example, cardiologist, general physician, or orthopedic?';
          }
          break;
          
        case 'ask_waiting_time':
          reply = 'To check waiting times, please select a doctor from the available list.';
          data.action = 'navigate_to_doctors';
          break;
          
        case 'cancel_appointment':
          reply = 'I can help you cancel an appointment. Please go to your appointments page to manage them.';
          data.action = 'navigate_to_appointments';
          break;
          
        default:
          reply = 'I can help you book appointments, find doctors, or check wait times. What would you like to do?';
      }
      
      res.json({ 
        intent: parsed.intent, 
        reply, 
        data,
        parsedData: parsed 
      });
      
    } catch (apiError) {
      console.error('AI API Error:', apiError.response?.data || apiError.message);
      
      // Fallback response if AI fails
      res.json({
        intent: 'greeting',
        reply: 'I\'m having trouble understanding right now. You can search for doctors, book appointments, or check your appointment history using the menu.',
        data: {}
      });
    }
    
  } catch (error) {
    console.error('Voice intent error:', error);
    res.status(500).json({ error: 'Failed to process voice command' });
  }
};