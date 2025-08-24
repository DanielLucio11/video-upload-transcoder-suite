# Nível Básico - Sistema de Upload com Transcodificação

Este é um exemplo básico de um sistema de upload e transcodificação de vídeos.

## Estrutura do Projeto

```text
nivel-basico/
├── controllers/
│   └── uploadController.js      # Lógica de controle para upload e transcodificação
├── routes/
│   └── uploadRoutes.js          # Definição das rotas da aplicação
├── public/
│   └── index.html               # Interface do usuário
├── uploads/                     # Diretório temporário para arquivos enviados
├── outputs/                     # Diretório para arquivos transcodificados
├── server.js                    # Arquivo principal do servidor
├── package.json                 # Dependências e configurações do projeto
└── package-lock.json
```

## Componentes Principais

### 1. Servidor (server.js)

O arquivo principal da aplicação que configura o servidor Express, define middlewares e rotas.

- Utiliza Express.js como framework web
- Serve arquivos estáticos do diretório [public](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/node_modules/express/lib/application.js#L734-L754)
- Implementa as rotas definidas em [uploadRoutes.js](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/routes/uploadRoutes.js)
- Escuta na porta definida na variável de ambiente `PORT` ou na porta 3000

### 2. Rotas (routes/uploadRoutes.js)

Define as rotas da aplicação:

- Rota POST `/upload` para receber uploads de vídeos
- Utiliza Multer para processar uploads de arquivos
- Encaminha requisições para o controller [uploadController.js](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/controllers/uploadController.js)

### 3. Controller (controllers/uploadController.js)

Contém a lógica de negócio da aplicação:

- Valida se um arquivo foi enviado
- Configura o caminho do FFmpeg
- Executa o comando de transcodificação
- Remove arquivos temporários após processamento
- Envia o arquivo transcodificado para download

### 4. Interface do Usuário (public/index.html)

Interface web simples que permite ao usuário:

- Selecionar um arquivo de vídeo
- Enviar o arquivo para transcodificação
- Receber o vídeo transcodificado automaticamente

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

## Fluxo de Funcionamento

1. Usuário acessa a interface web
2. Usuário seleciona e envia um arquivo de vídeo
3. O arquivo é salvo temporariamente no diretório [uploads/](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/uploads/)
4. O sistema executa o FFmpeg para transcodificar o vídeo para MP4 com resolução 1280x720
5. O arquivo temporário é removido
6. O vídeo transcodificado é salvo no diretório [outputs/](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/outputs/)
7. O vídeo transcodificado é enviado automaticamente para download
8. O arquivo transcodificado é removido após o download

## Configurações

### Porta do Servidor

A porta padrão é 3000, mas pode ser alterada definindo a variável de ambiente `PORT`.

### Caminho do FFmpeg

O sistema procura o FFmpeg em:

1. Caminho fixo: `C:\ffmpeg\bin\ffmpeg.exe` (Windows)
2. Comando global: `ffmpeg` (Linux/macOS e Windows com FFmpeg no PATH)
