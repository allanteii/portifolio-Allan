const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura o Express para servir arquivos estáticos da pasta atual
// Isso permite que o navegador encontre index.html, stayle.css, inicio.js etc.
app.use(express.static(__dirname));

// Define a rota principal para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
    console.log('Pressione CTRL+C para parar o servidor.');
});