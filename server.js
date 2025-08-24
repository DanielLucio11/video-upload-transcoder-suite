const express = require('express');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Rotas
app.use('/', uploadRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));