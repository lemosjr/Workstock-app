const { Avaliacao } = require('../model/index');
const logger = require('../config/logger');

class AvaliacaoRepository {
    // POST
    // C - CREATE: Insere uma nova avaliação na tabela 'avaliacao'
    async create(avaliacaoData) {
        try {
            return await Avaliacao.create(avaliacaoData);
        } catch (error) {
            logger.error(`Erro ao criar registro no banco (Repository): ${error.message}`);
            throw error;
        }
    }

    // GET (ONE)
    // R - READ: Busca a avaliação pela chave primária (ID Integer)
    async findById(id) {
        return await Avaliacao.findByPk(id);
    }

    // GET (ALL)
    // R - READ: Retorna todos os registros da tabela 'avaliacao' para painéis
    async findAll() {
        return await Avaliacao.findAll({
            order: [['id', 'ASC']]
        });
    }

    // PUT
    // U - UPDATE: Atualiza os dados da avaliação
    async update(id, updateData) {
        const avaliacao = await this.findById(id);
        if (!avaliacao) return null;
        
        return await avaliacao.update(updateData);
    }
    
    // D - DELETE: Remove a avaliacao do banco de dados
    async delete(id) {
        const avaliacao = await this.findById(id);
        if (!avaliacao) return false;
        
        await avaliacao.destroy();
        return true;
    }
}

module.exports = new AvaliacaoRepository();