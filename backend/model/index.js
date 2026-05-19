const sequelize = require('../config/sequelize');
const UserModel = require('./UserModel');
const ServiceModel = require('./ServiceModel'); // Importa o novo modelo

// Centraliza a instância e todos os modelos do projeto
const db = {
    sequelize,
    Sequelize: require('sequelize'),
    User: UserModel,
    ServiceRequest: ServiceModel // Adiciona o modelo à central do banco
};

// Executa as associações (relacionamentos) automaticamente
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;