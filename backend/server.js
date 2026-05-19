const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares essenciais
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições (req.body)

// Rota de teste inicial
app.get('/', (req, res) => {
    res.json({ message: "Backend FAAR operacional e rodando com sucesso!" });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando profissionalmente na porta ${PORT}`);
});