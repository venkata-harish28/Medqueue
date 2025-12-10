// src/pages/LiveQueue.jsx
// ========================================
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { queueAPI } from '../services/api';
import { useSocket } from '../context/SocketContext';
import { Clock, Users } from 'lucide-react';

const LiveQueue = () => {
  const { doctorId } = useParams();
  const [queue, setQueue] = useState([]);
  const { socket, joinDoctorRoom, leaveDoctorRoom } = useSocket();

  useEffect(() => {
    fetchQueue();
    if (doctorId && socket) {
      joinDoctorRoom(doctorId);

      socket.on('queue_updated', () => {
        fetchQueue();
      });

      socket.on('patient_seen', () => {
        fetchQueue();
      });
    }

    return () => {
      if (doctorId && socket) {
        leaveDoctorRoom(doctorId);
        socket.off('queue_updated');
        socket.off('patient_seen');
      }
    };
  }, [doctorId, socket]);

  const fetchQueue = async () => {
    try {
      const { data } = await queueAPI.getByDoctor(doctorId);
      setQueue(data);
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Live Queue</h1>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span className="text-lg">Total in Queue</span>
          </div>
          <span className="text-3xl font-bold">{queue.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Queue Status</h2>
          {queue.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No patients in queue</p>
          ) : (
            <div className="space-y-3">
              {queue.map((patient, index) => (
                <div
                  key={patient._id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {patient.queuePosition || index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{patient.userId?.name || 'Patient'}</p>
                      <p className="text-sm text-gray-600">Token: {patient.tokenNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      index === 0 ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {index === 0 ? 'Current' : `Position ${index + 1}`}
                    </p>
                    {patient.estimatedWaitTime && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{patient.estimatedWaitTime}m</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveQueue;