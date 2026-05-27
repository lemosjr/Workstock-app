const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const EspecialidadeModel = sequelize.define('Especialidade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true // Cada especialidade deve ter um nome único no sistema
    }
}, {
    tableName: 'especialidade',
    timestamps: false // O diagrama não define timestamps padrão nesta tabela
});

module.exports = EspecialidadeModel;
