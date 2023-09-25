const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo('https://2-l-8.github.io/MultiplayerGame/');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const chatRooms = {}; // Ein Objekt, um die Chatrooms zu speichern

io.on('connection', (socket) => {
    console.log('Ein Benutzer hat sich verbunden');

    // Benutzer tritt einem Chatroom bei
    socket.on('join', (room, username) => {
        socket.join(room); // Benutzer wird dem angegebenen Raum beigetreten
        socket.username = username;
        io.to(room).emit('user joined', `${username} ist dem Chatroom ${room} beigetreten.`);
    });

    // Benutzer sendet eine Nachricht im Raum
    socket.on('chat message', (room, message) => {
        io.to(room).emit('chat message', `${socket.username}: ${message}`);
    });

    // Benutzer verlässt den Chatroom
    socket.on('leave', (room) => {
        socket.leave(room); // Benutzer verlässt den Raum
        io.to(room).emit('user left', `${socket.username} hat den Chatroom ${room} verlassen.`);
    });

    socket.on('disconnect', () => {
        console.log('Ein Benutzer hat die Verbindung getrennt');
    });
});

server.listen(3000, () => {
    console.log('Server ist auf Port 3000 gestartet');
});
