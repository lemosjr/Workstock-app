const { Especialidade } = require('../model/index');
const logger = require('../config/logger');

class EspecialidadeRepository {
    // C - CREATE: Insere uma nova especialidade na tabela 'especialidade'
    async create(data) {
        try {
            return await Especialidade.create(data);
        } catch (error) {
            logger.error(`Erro ao criar especialidade: ${error.message}`);
            throw error;
        }
    }

    // R - READ: Retorna todas as especialidades ordenadas por nome
    async findAll() {
        return await Especialidade.findAll({
            order: [['nome', 'ASC']]
        });
    }

    // R - READ: Busca a especialidade pela chave primária (ID Integer)
    async findById(id) {
        return await Especialidade.findByPk(id);
    }

    // R - READ: Localiza a especialidade pelo nome único (usado para evitar duplicatas)
    async findByNome(nome) {
        return await Especialidade.findOne({ where: { nome } });
    }

    // U - UPDATE: Atualiza os dados da especialidade
    async update(id, updateData) {
        const especialidade = await this.findById(id);
        if (!especialidade) return null;
        return await especialidade.update(updateData);
    }

    // D - DELETE: Remove fisicamente a especialidade do banco de dados
    async delete(id) {
        const especialidade = await this.findById(id);
        if (!especialidade) return false;
        await especialidade.destroy();
        return true;
    }
}

module.exports = new EspecialidadeRepository();
