const express = require('express');
const morgan = require('morgan');
const db = require('./model/index');
const authRoutes = require('./route/AuthRoute');
const serviceRoutes = require('./route/ServiceRoute');
const empresaRoutes = require('./route/EmpresaRoute');
const historicoRoutes = require('./route/HistoricoRoute');
const avaliacaoRoutes = require('./route/AvaliacaoRoute');
const postagemRoutes = require('./route/PostagemRoute');
const especialidadeRoutes = require('./route/EspecialidadeRoute');
const orcamentoRoutes = require('./route/OrcamentoRoute');
const empresaEspecialidadeRoutes = require('./route/EmpresaEspecialidadeRoute');
const setupSwagger = require('./config/swagger');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Padrão
app.use(express.json());
app.use(morgan('dev'));

// Integração de Módulos
setupSwagger(app);
app.use('/api', authRoutes);
app.use('/api', serviceRoutes);
app.use('/api', empresaRoutes);
app.use('/api', historicoRoutes);
app.use('/api', avaliacaoRoutes);

app.use('/api', postagemRoutes);
app.use('/api', especialidadeRoutes);
app.use('/api', orcamentoRoutes);
app.use('/api', empresaEspecialidadeRoutes);

app.get('/', (req, res) => {
    res.json({ message: "WorkStock API rodando com sucesso!" });
});

// Inicialização do Banco de Dados e Servidor
async function startServer() {
    try {
        await db.sequelize.authenticate();
        logger.info('Conexão com o PostgreSQL realizada via Sequelize com sucesso!');

        await db.sequelize.sync({ alter: true });
        logger.info('Tabelas, colunas e índices validados/criados automaticamente.');

        app.listen(PORT, () => {
            logger.info(`Servidor backend operacional na porta ${PORT}`);
            logger.info(`Documentação interativa disponível em http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        logger.error(`Falha crítica ao iniciar o servidor backend: ${error.message}`);
        process.exit(1);
    }
}

startServer();

module.exports = app;