// index.js
const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('video'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `outputs/${req.file.filename}.mp4`;

  const ffmpeg = spawn('ffmpeg', [
    '-i', inputPath,
    '-vf', 'scale=1280:720',
    '-c:a', 'aac',
    '-progress', 'pipe:1',
    '-y', outputPath
  ]);

  ffmpeg.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('out_time=')) {
      const time = output.split('out_time=')[1].split('\n')[0];
      io.emit('progress', { time });
    }
  });

  ffmpeg.on('close', () => {
    io.emit('done', { url: `/download/${req.file.filename}` });
  });

  res.send('Upload iniciado');
});

app.get('/download/:id', (req, res) => {
  const file = `outputs/${req.params.id}.mp4`;
  res.download(file);
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));