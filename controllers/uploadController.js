const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const uploadVideo = (req, res) => {
  // Verifica se foi enviado um arquivo
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const inputPath = req.file.path;
  const outputPath = path.join('outputs', `${req.file.filename}.mp4`);
  
  // Define o caminho do ffmpeg (ajuste conforme a instalação real)
  let ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  
  // Verifica se o ffmpeg existe no caminho especificado
  if (!fs.existsSync(ffmpegPath)) {
    console.log('FFmpeg não encontrado no caminho padrão, tentando comando global');
    ffmpegPath = 'ffmpeg';
  }

  // Comando básico de transcodificação com FFmpeg
  const command = `"${ffmpegPath}" -i "${inputPath}" -vf scale=1280:720 -c:a aac "${outputPath}"`;
  console.log('Executando comando:', command);
  
  exec(command, (err, stdout, stderr) => {
    // Remove o arquivo temporário
    try {
      fs.unlinkSync(inputPath);
    } catch (unlinkErr) {
      console.error('Erro ao remover arquivo temporário:', unlinkErr);
    }

    if (err) {
      console.error('Erro na execução do FFmpeg:');
      console.error('Código de erro:', err.code);
      console.error('Sinal:', err.signal);
      console.error('Stderr:', stderr);
      console.error('Stdout:', stdout);
      
      // Verifica se o erro é relacionado ao comando não encontrado
      if (err.code === 1 && stderr && stderr.includes('não é reconhecido')) {
        return res.status(500).send(`FFmpeg não encontrado. Por favor, verifique se o FFmpeg está instalado. Caminho tentado: ${ffmpegPath}`);
      }
      
      return res.status(500).send('Erro na transcodificação: ' + err.message);
    }

    // Envia o arquivo transcodificado para download
    res.download(outputPath, (downloadErr) => {
      // Remove o arquivo transcodificado após o download
      if (downloadErr) {
        console.error('Erro no download:', downloadErr);
      } else {
        try {
          fs.unlinkSync(outputPath);
        } catch (unlinkErr) {
          console.error('Erro ao remover arquivo de saída:', unlinkErr);
        }
      }
    });
  });
};

module.exports = {
  uploadVideo
};