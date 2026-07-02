import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { setupInterviewSocket } from './socket/interview.socket.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'your_production_url' : 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

setupInterviewSocket(io);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
