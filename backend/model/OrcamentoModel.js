const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OrcamentoModel = sequelize.define('Orcamento', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true     
    },
    id_solicitacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_solicitacao', 
        references: { model: 'servico', key: 'id' }
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_empresa', 
        references: { model: 'empresa', key: 'id' }
    },
    valor_mao_obra: {
        type: DataTypes.NUMERIC(12, 2),
        allowNull: false,
        field: 'valor_mao_obra'
    },
    valor_material: {
        type: DataTypes.NUMERIC(12, 2),
        defaultValue: 0.00,
        field: 'valor_material'
    },
    valor_total: {
        type: DataTypes.NUMERIC(12, 2),
        allowNull: false,
        field: 'valor_total'
    },
    prazo_execucao: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'prazo_execucao'
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'descricao'
    },
    status_orcamento: {
        type: DataTypes.STRING(20),
        defaultValue: 'pending',
        allowNull: false,
        field: 'status_orcamento'
    }
}, {
    tableName: 'orcamento',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = OrcamentoModel;