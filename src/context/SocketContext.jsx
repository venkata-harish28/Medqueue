import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const joinDoctorRoom = (doctorId) => {
    if (socket) socket.emit('join_doctor_room', doctorId);
  };

  const leaveDoctorRoom = (doctorId) => {
    if (socket) socket.emit('leave_doctor_room', doctorId);
  };

  return (
    <SocketContext.Provider value={{ socket, joinDoctorRoom, leaveDoctorRoom }}>
      {children}
    </SocketContext.Provider>
  );
};