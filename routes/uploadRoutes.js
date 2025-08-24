const express = require('express');
const { uploadVideo } = require('../controllers/uploadController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', upload.single('video'), uploadVideo);

module.exports = router;