# Nível Básico - Sistema de Upload com Transcodificação

Este é um exemplo básico de um sistema de upload e transcodificação de vídeos.

## Estrutura do Projeto

- `server.js` - Arquivo principal do servidor
- `routes/` - Definição das rotas
- `controllers/` - Lógica de controle das operações
- `uploads/` - Diretório para armazenamento temporário de uploads
- `outputs/` - Diretório para armazenamento de vídeos transcodificados

## Dependências

- Node.js
- Express.js
- Multer (para upload de arquivos)
- FFmpeg (para transcodificação)

## Instalação

1. Certifique-se de ter o Node.js instalado
2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Certifique-se de ter o FFmpeg instalado em seu sistema

## Uso

1. Inicie o servidor:

   ```bash
   npm start
   ```

2. Acesse `http://localhost:3000` no seu navegador
3. Faça upload de um arquivo de vídeo
4. O vídeo será transcodificado e disponibilizado para download

## Funcionalidades

- Upload de arquivos de vídeo
- Transcodificação básica para formato MP4
- Download do vídeo transcodificado

# video-upload-transcoder-suite

TESTE TÉCNICO PARA POSIÇÃO DE DESENVOLVEDOR TECH LEAD FULLSTACK - "Sistema de Upload com Transcodificação"
