const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const RecuperacaoSenhaModel = sequelize.define('RecuperacaoSenha', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_usuario'
    },
    otp: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at'
    },
    usado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'recuperacao_senha',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = RecuperacaoSenhaModel;