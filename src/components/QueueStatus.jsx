// src/components/QueueStatus.jsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Clock, Users } from 'lucide-react';

const QueueStatus = ({ doctorId, appointment }) => {
  const { socket, joinDoctorRoom, leaveDoctorRoom } = useSocket();
  const [queueData, setQueueData] = useState({
    position: appointment?.queuePosition || 0,
    estimatedWait: appointment?.estimatedWaitTime || 0
  });

  useEffect(() => {
    if (doctorId && socket) {
      joinDoctorRoom(doctorId);

      socket.on('queue_updated', (data) => {
        if (data.doctorId === doctorId) {
          setQueueData(prev => ({
            ...prev,
            position: data.queuePosition
          }));
        }
      });

      return () => {
        leaveDoctorRoom(doctorId);
        socket.off('queue_updated');
      };
    }
  }, [doctorId, socket]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
      <h3 className="text-xl font-bold mb-4">Queue Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm text-blue-100">Your Position</span>
          </div>
          <p className="text-3xl font-bold">{queueData.position}</p>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm text-blue-100">Estimated Wait</span>
          </div>
          <p className="text-3xl font-bold">{queueData.estimatedWait}m</p>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;