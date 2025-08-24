const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class VideoService {
  /**
   * Transcode a video file to MP4 format (1280x720) with AAC audio
   * @param {string} inputPath - Path to the input video file
   * @param {string} outputPath - Path where the output video should be saved
   * @param {Function} onProgress - Callback function to report progress
   * @param {Function} onComplete - Callback function to report completion
   */
  transcodeVideo(inputPath, outputPath, onProgress, onComplete) {
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
        onProgress(time);
      }
    });

    ffmpeg.on('close', () => {
      onComplete();
    });
  }

  /**
   * Get the file path for the output video
   * @param {string} fileId - The ID of the uploaded file
   * @returns {string} - The full path to the output file
   */
  getOutputPath(fileId) {
    return path.join('outputs', `${fileId}.mp4`);
  }

  /**
   * Get the file path for downloading
   * @param {string} fileId - The ID of the file to download
   * @returns {string} - The full path to the file
   */
  getDownloadPath(fileId) {
    return this.getOutputPath(fileId);
  }
}

module.exports = new VideoService();