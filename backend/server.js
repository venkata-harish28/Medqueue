import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import queueRoutes from './routes/queue.js';
import voiceRoutes from './routes/voice.js';
import { setupQueueHandlers } from './socket/queueHandler.js';

dotenv.config();

// Connect to MongoDB first
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected Successfully');

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: { 
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Middleware
    app.use(cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Make io accessible to routes
    app.set('io', io);

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', message: 'Server is running' });
    });

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/doctors', doctorRoutes);
    app.use('/api/appointments', appointmentRoutes);
    app.use('/api/queue', queueRoutes);
    app.use('/api/voice', voiceRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(err.status || 500).json({ 
        error: err.message || 'Internal server error' 
      });
    });

    // Socket.io setup
    setupQueueHandlers(io);

    // Port with fallback
    const PORT = process.env.PORT || 5000;

    const tryStartServer = (port) => {
      httpServer.listen(port, () => {
        console.log(`✅ Server running on port ${port}`);
        console.log(`🔗 API: http://localhost:${port}`);
        console.log(`🔗 Frontend: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
      }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`❌ Port ${port} is busy, trying ${port + 1}...`);
          tryStartServer(port + 1);
        } else {
          console.error('❌ Server error:', err);
          process.exit(1);
        }
      });
    };

    tryStartServer(PORT);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();