const sequelize = require('../config/sequelize');
const UserModel = require('./UserModel');
const ServiceModel = require('./ServiceModel');
const EmpresaModel = require('./EmpresaModel');
const HistoricoModel = require('./HistoricoModel');
const RefreshTokenModel = require('./RefreshTokenModel');
const AvaliacaoModel = require('./AvaliacaoModel');
const PostagemModel = require('./PostagemModel');
const EspecialidadeModel = require('./EspecialidadeModel');
const EmpresaEspecialidadeModel = require('./EmpresaEspecialidadeModel');
const RecuperacaoSenhaModel = require('./RecuperacaoSenhaModel');

const db = {
    sequelize,
    Sequelize: require('sequelize'),
    User: UserModel,
    ServiceRequest: ServiceModel,
    Empresa: EmpresaModel,
    Historico: HistoricoModel,
    RefreshToken: RefreshTokenModel,
    Avaliacao: AvaliacaoModel,
    Postagem: PostagemModel,
    Especialidade: EspecialidadeModel,
    EmpresaEspecialidade: EmpresaEspecialidadeModel,
    RecuperacaoSenha: RecuperacaoSenhaModel
};

// Associações existentes
db.User.hasMany(db.ServiceRequest, { foreignKey: 'id_usuario', as: 'servicos' });
db.ServiceRequest.belongsTo(db.User, { foreignKey: 'id_usuario', as: 'cliente' });

// Nova associação: User 1:1 Empresa
db.User.hasOne(db.Empresa, { foreignKey: 'id_usuario', as: 'empresa' });
db.Empresa.belongsTo(db.User, { foreignKey: 'id_usuario', as: 'usuario' });

// Nova associação: ServiceRequest 1:N Historico
db.ServiceRequest.hasMany(db.Historico, { foreignKey: 'id_service', as: 'historico' });
db.Historico.belongsTo(db.ServiceRequest, { foreignKey: 'id_service', as: 'servico' });

// Nova associação: User 1:N RefreshToken
db.User.hasMany(db.RefreshToken, { foreignKey: 'id_usuario', as: 'refresh_tokens' });
db.RefreshToken.belongsTo(db.User, { foreignKey: 'id_usuario', as: 'usuario' });

// Nova associação: User 1:N Postagem
// Um serviço tem uma avaliação 1:1
db.ServiceRequest.hasOne(db.Avaliacao, { foreignKey: 'id_service', as: 'avaliacao' });
db.Avaliacao.belongsTo(db.ServiceRequest, { foreignKey: 'id_service', as: 'servico' });

// Uma empresa tem muitas avaliações
db.Empresa.hasMany(db.Avaliacao, { foreignKey: 'id_empresa', as: 'avaliacao' });
db.Avaliacao.belongsTo(db.Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
db.User.hasMany(db.Postagem, {foreignKey: 'id_usuario',as: 'postagens'});
db.Postagem.belongsTo(db.User, {foreignKey: 'id_usuario',as: 'usuario'});

// Nova associação: Empresa N:N Especialidade (via tabela pivô empresa_especialidade)
db.Empresa.belongsToMany(db.Especialidade, { through: db.EmpresaEspecialidade, foreignKey: 'id_empresa', as: 'especialidades' });
db.Especialidade.belongsToMany(db.Empresa, { through: db.EmpresaEspecialidade, foreignKey: 'id_especialidade', as: 'empresas' });

// Nova associação: User 1:N RecuperacaoSenha
db.User.hasMany(db.RecuperacaoSenha, { foreignKey: 'id_usuario', as: 'recuperacoes' });
db.RecuperacaoSenha.belongsTo(db.User, { foreignKey: 'id_usuario', as: 'usuario' });


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