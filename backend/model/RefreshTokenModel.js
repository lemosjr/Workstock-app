const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const RefreshTokenModel = sequelize.define('RefreshToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_usuario',
        references: {
            model: 'usuario',
            key: 'id'
        }
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at'
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    revoked_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'revoked_at'
    },
    user_agent: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'user_agent'
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'ip_address'
    }
}, {
    tableName: 'refresh_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            name: 'idx_refresh_token_usuario',
            fields: ['id_usuario']
        },
        {
            name: 'idx_refresh_token_token',
            fields: ['token']
        },
        {
            name: 'idx_refresh_token_expires',
            fields: ['expires_at']
        }
    ]
});

module.exports = RefreshTokenModel;