const { Sequelize } = require('sequelize');
require('dotenv').config(); // Garante o acesso às variáveis do arquivo .env

// Criação da instância de conexão com os parâmetros do .env
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nome do banco
    process.env.DB_USER,     // Usuário
    process.env.DB_PASSWORD, // Senha
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres', // Define que estamos usando o PostgreSQL
        logging: false,      // Define como true se quiser ver os comandos SQL no terminal
        define: {
            timestamps: true,          // Cria colunas 'createdAt' e 'updatedAt' automaticamente
            underscored: true,         // Transforma camelCase em snake_case para o banco (ex: userId -> user_id)
            underscoredAll: true
        }
    }
);

module.exports = sequelize;