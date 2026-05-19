const express = require('express');
const morgan = require('morgan');
const db = require('./model/index');
const authRoutes = require('./route/AuthRoute');
const serviceRoutes = require('./route/ServiceRoute'); // 1. Importa as novas rotas
const setupSwagger = require('./config/swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Padrão
app.use(express.json());
app.use(morgan('dev'));

// Integração de Módulos
setupSwagger(app);
app.use('/api', authRoutes);
app.use('/api', serviceRoutes); // 2. injeta as rotas de serviço prefixadas com '/api'

app.get('/', (req, res) => {
    res.json({ message: "WorkStock API rodando com sucesso no padrão do professor!" });
});

// Inicialização do Banco de Dados e Servidor
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Conexão com o PostgreSQL realizada via Sequelize com sucesso!');

        // Valida e cria a tabela 'service_requests' e seus índices automaticamente
        await db.sequelize.sync({ alter: true });
        console.log('📦 Tabelas, colunas e índices validados/criados automaticamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend operacional na porta ${PORT}`);
            console.log(`📄 Documentação interativa disponível em http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Falha crítica ao iniciar o servidor backend:', error);
        process.exit(1);
    }
}

startServer();