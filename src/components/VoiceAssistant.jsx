// src/components/VoiceAssistant.jsx
import React, { useState } from 'react';
import { Mic, MessageSquare, X } from 'lucide-react';
import { voiceAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const handleVoiceClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening...');
        setShowChat(true);
      };

      recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        
        try {
          const { data } = await voiceAPI.processIntent(text);
          setResponse(data.reply);
          
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(data.reply);
            speechSynthesis.speak(utterance);
          }

          if (data.intent === 'recommend_doctor' && data.data?.doctorId) {
            setTimeout(() => navigate(`/doctors/${data.data.doctorId}`), 2000);
          } else if (data.intent === 'book_appointment') {
            setTimeout(() => navigate('/doctors'), 2000);
          }
        } catch (error) {
          setResponse('Sorry, I had trouble processing that. Please try again.');
        }
        
        setIsListening(false);
      };

      recognition.onerror = () => {
        setTranscript('Error occurred. Please try again.');
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <>
      {showChat && (transcript || response) && (
        <div className="fixed bottom-24 right-6 bg-white p-4 rounded-lg shadow-lg max-w-sm z-40">
          <button 
            onClick={() => setShowChat(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
          
          {transcript && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">You said:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
          
          {response && (
            <div>
              <p className="text-xs text-gray-500 mb-1">AI Assistant:</p>
              <p className="text-sm text-blue-600">{response}</p>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleVoiceClick}
        disabled={isListening}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all z-50 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        title="Voice Assistant">
        {isListening ? (
          <MessageSquare className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
    </>
  );
};

export default VoiceAssistant;