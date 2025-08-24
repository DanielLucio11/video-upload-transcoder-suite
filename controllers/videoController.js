const videoService = require('../services/videoService');
const fs = require('fs');

class VideoController {
  /**
   * Handle video upload and start transcoding process
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} io - Socket.io instance for real-time communication
   */
  uploadVideo(req, res, io) {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo enviado');
    }

    const inputPath = req.file.path;
    const outputPath = videoService.getOutputPath(req.file.filename);

    // Start the transcoding process
    videoService.transcodeVideo(
      inputPath,
      outputPath,
      (time) => {
        // Emit progress updates via socket.io
        io.emit('progress', { time });
      },
      () => {
        // Emit completion event via socket.io
        io.emit('done', { url: `/download/${req.file.filename}` });
      }
    );

    res.send('Upload iniciado');
  }

  /**
   * Handle video download requests
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  downloadVideo(req, res) {
    const fileId = req.params.id;
    const file = videoService.getDownloadPath(fileId);

    // Check if file exists
    if (!fs.existsSync(file)) {
      return res.status(404).send('Arquivo nao encontrado');
    }

    res.download(file);
  }
}

module.exports = new VideoController();