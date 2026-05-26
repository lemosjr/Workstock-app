const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ServiceModel = sequelize.define('ServiceRequest', {
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
    categoria: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    tipo_imovel: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'tipo_imovel'
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    coordenadas: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    prazo_urgencia: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'prazo_urgencia'
    },
    faixa_preco: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'faixa_preco' // Ajustado para refletir o varchar do diagrama
    },
    status_solicitacao: {
        type: DataTypes.ENUM('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'),
        defaultValue: 'ABERTO',
        allowNull: false,
        field: 'status_solicitacao'
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'data_criacao'
    }
}, {
    tableName: 'servico',
    timestamps: false, // Controlado manualmente via data_criacao conforme o diagrama
    indexes: [
        {
            name: 'idx_servico_busca',
            fields: ['status_solicitacao', 'categoria']
        }
    ]
});


module.exports = ServiceModel;