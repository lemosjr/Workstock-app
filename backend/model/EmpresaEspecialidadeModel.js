const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const EmpresaEspecialidadeModel = sequelize.define('EmpresaEspecialidade', {
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_empresa',
        references: {
            model: 'empresa',
            key: 'id'
        }
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_especialidade',
        references: {
            model: 'especialidade',
            key: 'id'
        }
    }
}, {
    tableName: 'empresa_especialidade',
    timestamps: false // Tabela pivô N:N, não necessita de timestamps
});

module.exports = EmpresaEspecialidadeModel;
