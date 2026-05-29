const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const ServiceModel = require('./ServiceModel');
const EmpresaModel = require('./EmpresaModel');

const OrcamentoModel = sequelize.define('Orcamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_servico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'servico', // 👈 Força o PostgreSQL a olhar exatamente para a tabela 'servico' da foto
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresa', // 👈 Força o PostgreSQL a olhar exatamente para a tabela 'empresa' da foto
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  valor_estimado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  prazo_estimado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao_tecnica: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status_proposta: {
    type: DataTypes.ENUM('pendente', 'aprovado', 'rejeitado'),
    defaultValue: 'pendente'
  }
}, {
  tableName: 'orcamento',
  timestamps: true 
});

// Relacionamentos para o Sequelize conseguir fazer as buscas (Eager Loading/Include)
OrcamentoModel.belongsTo(ServiceModel, { foreignKey: 'id_servico', as: 'servico' });
OrcamentoModel.belongsTo(EmpresaModel, { foreignKey: 'id_empresa', as: 'empresa' });

module.exports = OrcamentoModel;