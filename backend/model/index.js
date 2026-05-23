const sequelize = require('../config/sequelize');
const UserModel = require('./UserModel');
const ServiceModel = require('./ServiceModel');
const EmpresaModel = require('./EmpresaModel');
const HistoricoModel = require('./HistoricoModel');

const db = {
    sequelize,
    Sequelize: require('sequelize'),
    User: UserModel,
    ServiceRequest: ServiceModel,
    Empresa: EmpresaModel,
    Historico: HistoricoModel
};

// Associações existentes
db.User.hasMany(db.ServiceRequest, { foreignKey: 'id_usuario', as: 'servicos' });
db.ServiceRequest.belongsTo(db.User, { foreignKey: 'id_usuario', as: 'cliente' });

// Associação User 1:1 Empresa
db.User.hasOne(db.Empresa, { foreignKey: 'id_usuario', as: 'empresa' });
db.Empresa.belongsTo(db.User, { foreignKey: 'id_usuario', as: 'usuario' });

// Associação Service 1:N Historico
db.ServiceRequest.hasMany(db.Historico, { foreignKey: 'id_service', as: 'historico' });
db.Historico.belongsTo(db.ServiceRequest, { foreignKey: 'id_service', as: 'servico' });

// Método para registrar histórico automaticamente
db.ServiceRequest.addHook('beforeUpdate', async (service, options) => {
    if (service.changed('status_solicitacao')) {
        const statusAnterior = service.previous('status_solicitacao');
        const statusNovo = service.status_solicitacao;
        
        if (statusAnterior !== statusNovo) {
            await db.Historico.create({
                id_service: service.id,
                status_anterior: statusAnterior,
                status_novo: statusNovo,
                comentario: `Status alterado de ${statusAnterior} para ${statusNovo}`,
                data_hora: new Date()
            });
        }
    }
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;