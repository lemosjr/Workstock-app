const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AvaliacaoModel = sequelize.define('AvaliacaoRequest', {
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
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_empresa',
        references: {
            model: 'empresa',
            key: 'id'
        }
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING(300),
        allowNull: true
    }
}, {
    modelName: 'Avaliacao',
    tableName: 'avaliacao',
    timestamps: false
});


module.exports = AvaliacaoModel;