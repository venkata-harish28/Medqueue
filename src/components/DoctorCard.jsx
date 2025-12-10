// src/components/DoctorCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, MapPin } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
         onClick={() => navigate(`/doctors/${doctor._id}`)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{doctor.rating}</span>
              <span className="text-sm text-gray-500">• {doctor.experience} years exp</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {doctor.available ? 'Available' : 'Busy'}
        </span>
      </div>

      {doctor.hospitalId && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{doctor.hospitalId.name}</span>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-blue-600">₹{doctor.fee}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/book/${doctor._id}`);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;