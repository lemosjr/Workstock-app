const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_razao: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'nome_razao'
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    cpf_cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        field: 'cpf_cnpj'
    },
    senha_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'senha_hash'
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    foto_perfil: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'foto_perfil'
    },
    tipo_usuario: {
        type: DataTypes.ENUM('PROPRIETARIO', 'EMPRESA', 'ADMIN'),
        allowNull: false,
        field: 'tipo_usuario'
    }
}, {
    tableName: 'usuario',
    timestamps: false, // O diagrama não define timestamps padrão nesta tabela
    indexes: [
        {
            name: 'idx_usuario_email_tipo',
            fields: ['email', 'tipo_usuario']
        }
    ]
});

module.exports = UserModel;