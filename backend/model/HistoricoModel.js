const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const HistoricoModel = sequelize.define('Historico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_service: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_service',
        references: {
            model: 'servico',
            key: 'id'
        }
    },
    status_anterior: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'status_anterior'
    },
    status_novo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'status_novo'
    },
    comentario: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'data_hora'
    }
}, {
    tableName: 'historico',
    timestamps: false,
    indexes: [
        {
            name: 'idx_historico_service',
            fields: ['id_service']
        },
        {
            name: 'idx_historico_data',
            fields: ['data_hora']
        }
    ]
});

module.exports = HistoricoModel;