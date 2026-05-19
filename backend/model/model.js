const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a nossa instância de conexão

const User = sequelize.define('User', {
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
            isEmail: true // Validação do Sequelize a nível de aplicação
        }
    },
    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash' // Mapeia o camelCase para o snake_case do banco
    },
    role: {
        type: DataTypes.STRING(20),
        defaultValue: 'company',
        allowNull: false,
        validate: {
            isIn: [['company', 'admin']] // Garante a consistência da CHECK constraint
        }
    }
}, {
    tableName: 'users', // Nome exato da tabela no banco de dados
    timestamps: true    // Habilita automaticamento o created_at e updated_at
});

module.exports = User;