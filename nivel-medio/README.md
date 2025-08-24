# 🎬 Video Upload com Feedback em Tempo Real - Nível Médio

Este projeto implementa um sistema de upload de vídeos com feedback em tempo real durante o processo de transcodificação. O usuário pode enviar vídeos em diversos formatos que serão convertidos para MP4 em resolução 1280x720 com áudio AAC.

## 🚀 Funcionalidades

- Upload de vídeos em formatos variados (MP4, AVI, MOV, MKV, etc.)
- Transcodificação em tempo real para MP4 (1280x720) com áudio AAC
- Feedback visual em tempo real do progresso da transcodificação
- Visualização e download do vídeo após processamento
- Interface responsiva e amigável

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **Socket.IO** - Biblioteca para comunicação em tempo real
- **Multer** - Middleware para upload de arquivos
- **FFmpeg** - Ferramenta de processamento de vídeo

### Frontend

- **Vanilla JavaScript** - Para interatividade
- **Socket.IO Client** - Cliente para conexão em tempo real
- **HTML5/CSS3** - Estrutura e estilização

## 📁 Estrutura do Projeto

```text
nivel-medio/
├── public/
│   ├── index.html     # Interface principal
│   ├── script.js      # Lógica do frontend
│   └── styles.css     # Estilização
├── uploads/           # Diretório temporário para uploads
├── outputs/           # Diretório para vídeos processados
├── server.js          # Servidor principal
└── package.json       # Dependências e scripts
```

## ▶️ Como Executar

### Pré-requisitos

- Node.js instalado
- FFmpeg instalado e disponível no PATH do sistema

### Instalação

1. Navegue até o diretório do projeto:

   ```bash
   cd nivel-medio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Certifique-se de que o FFmpeg está instalado:

   ```bash
   ffmpeg -version
   ```

### Executando a Aplicação

Para iniciar o servidor em modo de produção:

```bash
npm start
```

Para desenvolvimento com reinicialização automática:

```bash
npm run dev
```

Acesse a aplicação em: `http://localhost:3000`

## 🎯 Uso

1. Acesse a interface web
2. Clique na área de upload ou arraste um vídeo para a zona indicada
3. Clique em "Enviar Vídeo"
4. Acompanhe o progresso da transcodificação em tempo real
5. Após concluído, visualize o vídeo transcoded
6. Faça o download do vídeo processado

## ⚙️ Funcionamento Técnico

1. O usuário faz upload de um vídeo através do formulário
2. O servidor recebe o arquivo e o armazena temporariamente na pasta [uploads/](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-medio/uploads)
3. O FFmpeg é acionado via processo filho para transcodificar o vídeo
4. O progresso é capturado através da saída do FFmpeg
5. O progresso é enviado em tempo real para o cliente via Socket.IO
6. O vídeo processado é salvo na pasta [outputs/](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-medio/outputs)
7. O usuário pode visualizar e baixar o vídeo após conclusão

## 🧪 Testes

Para testar o funcionamento, envie vídeos nos formatos suportados:

- MP4
- AVI
- MOV
- MKV

O sistema irá converter qualquer formato para MP4 com resolução 1280x720.

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
