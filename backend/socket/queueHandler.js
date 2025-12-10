export const setupQueueHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('join_doctor_room', (doctorId) => {
      socket.join(`doctor:${doctorId}`);
    });
    
    socket.on('leave_doctor_room', (doctorId) => {
      socket.leave(`doctor:${doctorId}`);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};