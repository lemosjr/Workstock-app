const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false, // Define como true se quiser ver os SQLs gerados no terminal
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
    }
);

module.exports = sequelize;