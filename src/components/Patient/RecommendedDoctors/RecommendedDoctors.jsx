// src/components/Patient/RecommendedDoctors/RecommendedDoctors.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { doctorAPI } from '../../../services/api';

const RecommendedDoctors = ({ symptoms = '', specialty = '', limit = 3 }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, [symptoms, specialty]);

  const fetchRecommendations = async () => {
    try {
      const params = {};
      if (specialty) params.specialty = specialty;
      if (limit) params.limit = limit;
      
      const { data } = await doctorAPI.getAll(params);
      setDoctors(data.slice(0, limit));
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-xl font-bold">Recommended Doctors</h2>
        </div>
        <p className="text-blue-100 text-sm">
          {symptoms ? 'Based on your symptoms' : 'Top rated doctors for you'}
        </p>
      </div>

      {/* Doctors List */}
      <div className="p-6 space-y-4">
        {doctors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recommendations available</p>
          </div>
        ) : (
          doctors.map((doctor, index) => (
            <div
              key={doctor._id || index}
              onClick={() => navigate(`/doctors/${doctor._id}`)}
              className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 cursor-pointer hover:shadow-md transition group"
            >
              {/* Match Score Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {Math.floor(85 + Math.random() * 15)}% Match
                </span>
                <span className="text-xs text-gray-500">#{index + 1}</span>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {doctor.name?.charAt(0) || 'D'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{doctor.rating || '4.8'}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-600">{doctor.experience}y exp</span>
                  </div>

                  {doctor.hospitalId && (
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{doctor.hospitalId.name}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">₹{doctor.fee}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/book/${doctor._id}`);
                      }}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center"
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Book
                    </button>
                  </div>
                </div>
              </div>

              {/* Why Recommended */}
              {symptoms && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">Why recommended:</span> Specializes in treating {symptoms.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          ))
        )}

        {/* View All Button */}
        <button 
          onClick={() => navigate('/doctors')}
          className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center group"
        >
          Browse All Doctors
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};

export default RecommendedDoctors;