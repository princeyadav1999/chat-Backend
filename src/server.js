//server.js or index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

 //Enable CORS for React dev server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // replace with your React dev URL
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// Socket.io handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user-send-message', (message) => {
    console.log('Message from user:', message);
    io.emit('message', message); // broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

 //If you are NOT serving static frontend files, this is optional
app.get('/', (req, res) => {
  res.send('Socket server running...');
});

server.listen(3008, () => {
  console.log('Server listening on port 3008');
});


