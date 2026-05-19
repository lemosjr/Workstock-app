const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    },
    role: {
        type: DataTypes.STRING(20),
        defaultValue: 'company',
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    // Criação automática do índice no banco de dados através do ORM
    indexes: [
        {
            name: 'idx_users_email',
            fields: ['email']
        }
    ]
});

module.exports = UserModel;