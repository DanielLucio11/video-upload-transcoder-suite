const express = require('express');
const multer = require('multer');
const videoController = require('../controllers/videoController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * POST /upload
 * Upload a video file and start transcoding
 */
router.post('/upload', upload.single('video'), (req, res) => {
  // We need to pass the socket.io instance to the controller
  // This will be set in the server.js file
  videoController.uploadVideo(req, res, req.app.get('io'));
});

/**
 * GET /download/:id
 * Download a transcoded video file
 */
router.get('/download/:id', (req, res) => {
  videoController.downloadVideo(req, res);
});

module.exports = router;