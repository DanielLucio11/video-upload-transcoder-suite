const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Make io accessible to our routes
app.set('io', io);

app.use(express.static('public'));
app.use('/', videoRoutes);

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));