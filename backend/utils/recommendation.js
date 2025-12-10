import Doctor from '../models/Doctor.js';
import axios from 'axios';

const symptomToSpecialty = {
  'fever': 'General Physician',
  'cough': 'General Physician',
  'chest pain': 'Cardiology',
  'heart': 'Cardiology',
  'joint pain': 'Orthopedics',
  'bone': 'Orthopedics',
  'stomach': 'Gastroenterology',
  'vomiting': 'Gastroenterology',
  'skin': 'Dermatology',
  'rash': 'Dermatology'
};

export const recommendDoctorBySymptoms = async (symptoms) => {
  // Stage 1: Rule-based
  let specialty = 'General Physician';
  for (const [keyword, spec] of Object.entries(symptomToSpecialty)) {
    if (symptoms.toLowerCase().includes(keyword)) {
      specialty = spec;
      break;
    }
  }
  
  // Stage 2: AI refinement
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `Patient symptoms: "${symptoms}". Recommend the best medical specialty and explain why in 1-2 sentences.`
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    const aiReasoning = response.data.content[0].text;
    
    const doctor = await Doctor.findOne({ specialty, available: true }).sort({ rating: -1 });
    
    return {
      doctor,
      specialty,
      reasoning: aiReasoning
    };
  } catch (error) {
    const doctor = await Doctor.findOne({ specialty, available: true }).sort({ rating: -1 });
    return { doctor, specialty, reasoning: 'Based on your symptoms' };
  }
};