const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ServiceModel = sequelize.define('ServiceRequest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    clientName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'client_name'
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false // Ex: 'Pintura', 'Alvenaria', 'Elétrica'
    },
    propertyType: {
        type: DataTypes.STRING(50),
        allowNull: false, // Ex: 'Apartamento', 'Casa'
        field: 'property_type'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    locationApprox: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'location_approx'
    },
    urgencyDeadline: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'urgency_deadline'
    },
    estimatedBudget: {
        type: DataTypes.NUMERIC(12, 2),
        allowNull: false,
        field: 'estimated_budget'
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'open',
        allowNull: false // open, in_progress, completed, canceled
    }
}, {
    tableName: 'service_requests',
    timestamps: true,
    // Criação automática dos índices compostos para otimizar os filtros do dashboard [RF014]
    indexes: [
        {
            name: 'idx_services_lookup',
            fields: ['status', 'category', 'property_type']
        }
    ]
});

module.exports = ServiceModel;