// src/components/VoiceAssistant.jsx
import React, { useState, useEffect } from 'react';
import { Mic, MessageSquare, X, Volume2 } from 'lucide-react';
import { voiceAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const navigate = useNavigate();

  // Check for browser support
  const isSpeechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceClick = () => {
    if (!isSpeechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('🎤 Listening...');
      setShowChat(true);
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      
      // Add user message to history
      setConversationHistory(prev => [...prev, { type: 'user', text }]);
      
      try {
        // Process the voice command
        const { data } = await voiceAPI.processIntent(text);
        const aiResponse = data.reply || 'I understood your request. How can I help you further?';
        
        setResponse(aiResponse);
        speak(aiResponse);
        
        // Add AI response to history
        setConversationHistory(prev => [...prev, { type: 'assistant', text: aiResponse }]);

        // Handle navigation based on intent
        if (data.intent === 'recommend_doctor' && data.data?.doctorId) {
          setTimeout(() => navigate(`/doctors/${data.data.doctorId}`), 2000);
        } else if (data.intent === 'book_appointment') {
          setTimeout(() => navigate('/doctors'), 2000);
        } else if (data.intent === 'view_appointments') {
          setTimeout(() => navigate('/appointments'), 2000);
        } else if (data.intent === 'search_doctors') {
          setTimeout(() => navigate('/doctors'), 1500);
        }
      } catch (error) {
        const errorMsg = 'Sorry, I had trouble processing that. Could you try again?';
        setResponse(errorMsg);
        speak(errorMsg);
        setConversationHistory(prev => [...prev, { type: 'assistant', text: errorMsg }]);
      }
      
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorMsg = 'Error occurred. Please try again.';
      
      if (event.error === 'no-speech') {
        errorMsg = 'No speech detected. Please try again.';
      } else if (event.error === 'not-allowed') {
        errorMsg = 'Microphone access denied. Please enable microphone permissions.';
      }
      
      setTranscript(errorMsg);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const clearHistory = () => {
    setConversationHistory([]);
    setTranscript('');
    setResponse('');
    window.speechSynthesis.cancel();
  };

  return (
    <>
      {/* Chat History Panel */}
      {showChat && conversationHistory.length > 0 && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl max-w-md w-full z-40 max-h-96 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => speak(conversationHistory[conversationHistory.length - 1]?.text || '')}
                className="p-1 hover:bg-white/20 rounded transition"
                title="Repeat last message"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button 
                onClick={clearHistory}
                className="p-1 hover:bg-white/20 rounded transition"
                title="Clear history"
              >
                <X className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowChat(false)}
                className="p-1 hover:bg-white/20 rounded transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {conversationHistory.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isListening && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <p className="text-sm text-gray-600 animate-pulse">🎤 Listening...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-500 text-center">
              Tip: Say "Book an appointment" or "Find a doctor"
            </p>
          </div>
        </div>
      )}

      {/* Voice Button */}
      <button
        onClick={handleVoiceClick}
        disabled={isListening}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all z-50 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-110 hover:shadow-3xl'
        }`}
        title="Voice Assistant"
      >
        {isListening ? (
          <MessageSquare className="w-8 h-8 text-white animate-bounce" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Floating indicator when listening */}
      {isListening && (
        <div className="fixed bottom-28 right-6 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg z-40 animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-medium">Recording...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;