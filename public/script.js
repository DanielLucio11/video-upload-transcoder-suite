class VideoUploader {
    constructor() {
        this.socket = io();
        this.setupElements();
        this.setupEventListeners();
        this.setupSocketListeners();
        this.currentFile = null;
    }

    setupElements() {
        this.uploadForm = document.getElementById('uploadForm');
        this.uploadArea = document.getElementById('uploadArea');
        this.videoInput = document.getElementById('videoInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.progressContainer = document.getElementById('progressContainer');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercent = document.getElementById('progressPercent');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.resultContainer = document.getElementById('resultContainer');
        this.videoPreview = document.getElementById('videoPreview');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.errorContainer = document.getElementById('errorContainer');
    }

    setupEventListeners() {
        // Upload area click
        this.uploadArea.addEventListener('click', () => {
            this.videoInput.click();
        });

        // File selection
        this.videoInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drag and drop
        this.setupDragAndDrop();

        // Form submission
        this.uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.uploadVideo();
        });

        // Reset button
        this.resetBtn.addEventListener('click', () => {
            this.resetUpload();
        });
    }

    setupDragAndDrop() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.uploadArea.addEventListener(eventName, () => {
                this.uploadArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.uploadArea.addEventListener(eventName, () => {
                this.uploadArea.classList.remove('dragover');
            }, false);
        });

        this.uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        }, false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFileSelect(file) {
        if (file && file.type.startsWith('video/')) {
            this.currentFile = file;
            this.uploadArea.querySelector('.upload-text').textContent = `Arquivo selecionado: ${file.name}`;
            this.uploadBtn.disabled = false;
        } else {
            this.showError('Por favor, selecione um arquivo de vídeo válido.');
        }
    }

    setupSocketListeners() {
        this.socket.on('progress', (data) => {
            this.updateProgress(data.time);
        });

        this.socket.on('done', (data) => {
            this.showResult(data.url);
        });
    }

    uploadVideo() {
        if (!this.currentFile) {
            this.showError('Por favor, selecione um vídeo primeiro.');
            return;
        }

        const formData = new FormData();
        formData.append('video', this.currentFile);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro no upload');
            }
            this.showProgress();
        })
        .catch(error => {
            this.showError('Erro ao enviar o vídeo. Tente novamente.');
            console.error('Error:', error);
        });
    }

    showProgress() {
        this.uploadForm.style.display = 'none';
        this.progressContainer.style.display = 'block';
        this.resetBtn.style.display = 'inline-block';
    }

    updateProgress(time) {
        if (time) {
            this.timeDisplay.textContent = time;
            // Estimativa de progresso (simplificada)
            const seconds = this.parseTimeToSeconds(time);
            const progress = Math.min((seconds / 30) * 100, 100); // Ajuste conforme necessário
            this.progressFill.style.width = progress + '%';
            this.progressPercent.textContent = Math.round(progress);
        }
    }

    parseTimeToSeconds(timeString) {
        const parts = timeString.split(':');
        if (parts.length === 3) {
            const hours = parseInt(parts[0]) || 0;
            const minutes = parseInt(parts[1]) || 0;
            const seconds = parseInt(parts[2]) || 0;
            return hours * 3600 + minutes * 60 + seconds;
        }
        return 0;
    }

    showResult(downloadUrl) {
        this.progressContainer.style.display = 'none';
        this.resultContainer.style.display = 'block';
        
        // Atualiza o preview e o link de download
        this.videoPreview.src = downloadUrl;
        this.downloadBtn.href = downloadUrl;
    }

    resetUpload() {
        // Reset form
        this.uploadForm.reset();
        this.uploadForm.style.display = 'block';
        this.progressContainer.style.display = 'none';
        this.resultContainer.style.display = 'none';
        this.resetBtn.style.display = 'none';
        
        // Reset progress
        this.progressFill.style.width = '0%';
        this.progressPercent.textContent = '0';
        this.timeDisplay.textContent = '00:00:00';
        
        // Reset file info
        this.uploadArea.querySelector('.upload-text').textContent = 'Clique para selecionar ou arraste seu vídeo aqui';
        this.currentFile = null;
        this.uploadBtn.disabled = true;
        
        // Clear error
        this.errorContainer.innerHTML = '';
    }

    showError(message) {
        this.errorContainer.innerHTML = `<div class="error">${message}</div>`;
        setTimeout(() => {
            this.errorContainer.innerHTML = '';
        }, 5000);
    }
}

// Inicializa o uploader quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    new VideoUploader();
});