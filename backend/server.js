const express = require('express');
const sequelize = require('./config/database');
const routes = require('./route/route');
const setupSwagger = require('./config/swagger'); // Importa a configuração do Swagger
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Inicializa a documentação Swagger na rota /api-docs 
setupSwagger(app);

// Vincula todas as rotas da aplicação prefixadas com '/api' 
app.use('/api', routes);

// Rota base para verificação de integridade
app.get('/', (req, res) => {
    res.json({ message: "Backend WorkStock operacional e rodando com sucesso!" });
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso via Sequelize!');

        await sequelize.sync({ alter: true });
        console.log('📦 Todos os modelos foram sincronizados com o banco de dados.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando profissionalmente na porta ${PORT}`);
            console.log(`📄 Documentação da API disponível em http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Não foi possível conectar ao banco de dados:', error);
        process.exit(1);
    }
}

startServer();