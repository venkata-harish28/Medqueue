// src/pages/DoctorProfile.jsx
// ========================================
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Star, MapPin, DollarSign, Clock } from 'lucide-react';
import { doctorAPI } from '../services/api';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const { data } = await doctorAPI.getById(id);
      setDoctor(data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;
  if (!doctor) return <div className="max-w-4xl mx-auto px-4 py-8">Doctor not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start space-x-6 mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
            <p className="text-xl text-gray-600 mb-3">{doctor.specialty}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{doctor.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{doctor.experience} years experience</span>
              </div>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full ${
            doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {doctor.available ? 'Available' : 'Busy'}
          </span>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="space-y-3">
            {doctor.hospitalId && (
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span>{doctor.hospitalId.name}</span>
              </div>
            )}
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
              <span>Consultation Fee: ₹{doctor.fee}</span>
            </div>
            {doctor.languages && doctor.languages.length > 0 && (
              <div className="flex items-start text-gray-700">
                <span className="mr-3 text-gray-400">Languages:</span>
                <span>{doctor.languages.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {doctor.description && (
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700">{doctor.description}</p>
          </div>
        )}

        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => navigate(`/book/${doctor._id}`)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Book Appointment
          </button>
          <button
            onClick={() => navigate('/doctors')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;