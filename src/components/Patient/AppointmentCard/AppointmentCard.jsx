// src/components/AppointmentCard.jsx
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  const statusColors = {
    booked: 'bg-blue-100 text-blue-700',
    'checked-in': 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{appointment.doctorId?.name}</h3>
            <p className="text-sm text-gray-600">{appointment.doctorId?.specialty}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status]}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(appointment.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{appointment.time}</span>
        </div>
        {appointment.tokenNumber && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600">Token Number</p>
            <p className="text-2xl font-bold text-blue-600">{appointment.tokenNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;