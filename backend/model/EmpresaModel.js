const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const EmpresaModel = sequelize.define('Empresa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // 1:1 com usuario
        field: 'id_usuario',
        references: {
            model: 'usuario',
            key: 'id'
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    avaliacao_media: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        },
        field: 'avaliacao_media'
    }
}, {
    tableName: 'empresa',
    timestamps: false
});

module.exports = EmpresaModel;