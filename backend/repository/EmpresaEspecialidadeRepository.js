const { EmpresaEspecialidade } = require('../model/index');
const logger = require('../config/logger');

class EmpresaEspecialidadeRepository {
    // R - READ: Busca todos os vínculos de especialidades de uma empresa
    async findByEmpresaId(id_empresa) {
        return await EmpresaEspecialidade.findAll({
            where: { id_empresa }
        });
    }

    // R - READ: Busca todos os vínculos de empresas de uma especialidade (usado para validar exclusão)
    async findByEspecialidadeId(id_especialidade) {
        return await EmpresaEspecialidade.findAll({
            where: { id_especialidade }
        });
    }

    // C - CREATE: Vincula uma especialidade a uma empresa
    async link(id_empresa, id_especialidade) {
        try {
            return await EmpresaEspecialidade.create({ id_empresa, id_especialidade });
        } catch (error) {
            logger.error(`Erro ao vincular especialidade à empresa: ${error.message}`);
            throw error;
        }
    }

    // D - DELETE: Desvincula uma especialidade de uma empresa
    async unlink(id_empresa, id_especialidade) {
        const vinculo = await EmpresaEspecialidade.findOne({ where: { id_empresa, id_especialidade } });
        if (!vinculo) return false;
        await vinculo.destroy();
        return true;
    }

    // D - DELETE: Remove todos os vínculos de uma empresa (útil ao sincronizar especialidades no update)
    async deleteAllByEmpresa(id_empresa) {
        return await EmpresaEspecialidade.destroy({ where: { id_empresa } });
    }
}

module.exports = new EmpresaEspecialidadeRepository();
