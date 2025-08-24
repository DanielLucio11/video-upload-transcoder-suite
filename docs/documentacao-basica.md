# Documentação - Nível Básico: Sistema de Upload com Transcodificação

## Visão Geral

O sistema de upload com transcodificação é uma aplicação Node.js que permite aos usuários fazer upload de vídeos, que são então transcodificados usando FFmpeg para um formato padrão (MP4) e disponibilizados para download.

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

## Fluxo de Funcionamento

1. Usuário acessa a interface web
2. Usuário seleciona e envia um arquivo de vídeo
3. O arquivo é salvo temporariamente no diretório [uploads/](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/uploads/)
4. O sistema executa o FFmpeg para transcodificar o vídeo para MP4 com resolução 1280x720
5. O arquivo temporário é removido
6. O vídeo transcodificado é salvo no diretório [outputs/](file:///c%3A/Users/Pc/Desktop/video-upload-transcoder-suite/nivel-basico/outputs/)
7. O vídeo transcodificado é enviado automaticamente para download
8. O arquivo transcodificado é removido após o download

## Dependências

- **Node.js**: Ambiente de execução JavaScript
- **Express.js**: Framework web para Node.js
- **Multer**: Middleware para upload de arquivos
- **FFmpeg**: Ferramenta de processamento de vídeo

## Instalação e Configuração

### Pré-requisitos

1. Node.js instalado
2. FFmpeg instalado e acessível no sistema

### Passos de Instalação

1. Navegue até o diretório do projeto:

   ```bash
   cd nivel-basico
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Certifique-se de que o FFmpeg está instalado:

   - No Windows: Adicione o caminho do FFmpeg à variável de ambiente PATH
   - No Linux/macOS: Instale via gerenciador de pacotes e certifique-se de que está no PATH

### Execução

1. Inicie o servidor:

   ```bash
   npm start
   ```

2. Acesse a aplicação em `http://localhost:3000`

## Configurações

### Porta do Servidor

A porta padrão é 3000, mas pode ser alterada definindo a variável de ambiente `PORT`.

### Caminho do FFmpeg

O sistema procura o FFmpeg em:
1. Caminho fixo: `C:\ffmpeg\bin\ffmpeg.exe` (Windows)
2. Comando global: `ffmpeg` (Linux/macOS e Windows com FFmpeg no PATH)

## Limitações Conhecidas

- Processamento síncrono de vídeos (um por vez)
- Sem validação avançada de tipos de arquivo
- Sem barra de progresso para o usuário
- Sem tratamento de falhas de transcodificação avançado
- Sem limite de tamanho de arquivo

## Possíveis Melhorias

- Implementar processamento assíncrono com fila de tarefas
- Adicionar validação mais robusta de formatos de vídeo
- Incluir barra de progresso durante o upload e transcodificação
- Adicionar tratamento de erros mais detalhado
- Implementar limite de tamanho de arquivo
- Adicionar suporte a múltiplos formatos de saída