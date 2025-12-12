// src/components/Doctor/AppointmentsList/AppointmentsList.jsx
import React, { useState } from 'react';
import { User, Clock, Calendar, CheckCircle, XCircle, Phone, MessageSquare, FileText } from 'lucide-react';

const AppointmentsList = ({ appointments = [] }) => {
  const [filter, setFilter] = useState('all');

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      'in-progress': 'bg-purple-100 text-purple-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-200">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No appointments found</p>
          </div>
        ) : (
          filteredAppointments.map((appointment, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.patientName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{appointment.patientName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                  {getStatusIcon(appointment.status)}
                  <span>{appointment.status.replace('-', ' ')}</span>
                </span>
              </div>

              {appointment.symptoms && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">Symptoms</p>
                      <p className="text-sm text-blue-700">{appointment.symptoms}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;