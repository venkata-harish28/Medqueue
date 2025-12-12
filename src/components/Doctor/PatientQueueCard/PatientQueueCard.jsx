// src/components/Doctor/PatientQueueCard/PatientQueueCard.jsx
import React from 'react';
import { Users, Clock, ArrowRight, Bell } from 'lucide-react';

const PatientQueueCard = ({ queue = [] }) => {
  const currentPatient = queue[0];
  const upcomingPatients = queue.slice(1, 4);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Patient Queue</h2>
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
            <Users className="w-4 h-4" />
            <span className="font-semibold">{queue.length}</span>
          </div>
        </div>
        <p className="text-blue-100 text-sm">Patients waiting for consultation</p>
      </div>

      {/* Current Patient */}
      {currentPatient ? (
        <div className="p-6 bg-green-50 border-b-2 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-green-700 uppercase">Now Consulting</span>
            <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
              #{currentPatient.tokenNumber}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentPatient.patientName?.charAt(0) || 'P'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">{currentPatient.patientName}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{currentPatient.time}</span>
                </div>
              </div>
            </div>
          </div>
          {currentPatient.symptoms && (
            <div className="mt-3 p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Symptoms:</p>
              <p className="text-sm text-gray-700">{currentPatient.symptoms}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No patients in queue</p>
        </div>
      )}

      {/* Upcoming Patients */}
      {upcomingPatients.length > 0 && (
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Up Next</h3>
          <div className="space-y-3">
            {upcomingPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 2}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{patient.patientName}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{patient.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-blue-600">#{patient.tokenNumber}</span>
                  <button className="p-1 hover:bg-gray-200 rounded transition">
                    <Bell className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {queue.length > 4 && (
            <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium text-sm flex items-center justify-center">
              View All {queue.length} Patients
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientQueueCard;