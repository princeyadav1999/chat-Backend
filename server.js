
import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import path from 'path';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
app.use(express.static(path.resolve('./public')));

const io = new Server(server);






// Socket.io Connection
    io.on('connection', (socket) =>{
    console.log("user connected", socket.id);
     socket.on("user-send-message", (message) =>{ 
     console.log("message from user", message);   
     io.emit("message", message);
     })

   
    });


 app.get('/', (req, res) => {
 return res.sendFile("./Chat-frontend" + "/index.html", { root: path.resolve() });
});

server.listen(3008, () => console.log("Server Start"));










