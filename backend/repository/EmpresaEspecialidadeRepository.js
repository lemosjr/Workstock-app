const { EmpresaEspecialidade, Especialidade } = require('../model/index');
const logger = require('../config/logger');

class EmpresaEspecialidadeRepository {
    // Buscar todas as especialidades vinculadas a uma empresa
    async findByEmpresaId(id_empresa) {
        return await EmpresaEspecialidade.findAll({
            where: { id_empresa },
            include: [{ model: Especialidade, as: 'especialidade' }]
        });
    }

    // Vincular uma especialidade a uma empresa
    async vincular(id_empresa, id_especialidade) {
        try {
            return await EmpresaEspecialidade.create({ id_empresa, id_especialidade });
        } catch (error) {
            logger.error(`Erro ao vincular especialidade à empresa: ${error.message}`);
            throw error;
        }
    }

    // Desvincular uma especialidade de uma empresa
    async desvincular(id_empresa, id_especialidade) {
        const vinculo = await EmpresaEspecialidade.findOne({ where: { id_empresa, id_especialidade } });
        if (!vinculo) return false;
        await vinculo.destroy();
        return true;
    }

    // Remover todos os vínculos de uma empresa (útil ao sincronizar especialidades no update)
    async deleteAllByEmpresa(id_empresa) {
        return await EmpresaEspecialidade.destroy({ where: { id_empresa } });
    }
}

module.exports = new EmpresaEspecialidadeRepository();
