const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

/**
 * Modelo de Postagem
 * Define a estrutura e validações de postagens no banco de dados.
 * Postagens são conteúdos criados por empresas para compartilhar no feed.
 */
const PostagemModel = sequelize.define('Postagem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    descricao: {
        type: DataTypes.STRING(1400),
        allowNull: true
    },

    data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fotos: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Array de URLs de fotos em formato JSON'
    }
},
{
    tableName: 'postagem',
    timestamps: false,

    indexes: [
        {
            name: 'idx_postagem_feed_usuario',
            fields: ['id_usuario', 'data_hora']
        }
    ]
});

module.exports = PostagemModel;