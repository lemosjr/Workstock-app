const especialidadeRepository = require('../repository/EspecialidadeRepository');
const empresaEspecialidadeRepository = require('../repository/EmpresaEspecialidadeRepository');
const logger = require('../config/logger');

class EspecialidadeService {
    async getAll() {
        return await especialidadeRepository.findAll();
    }

    async getById(id) {
        const especialidade = await especialidadeRepository.findById(id);
        if (!especialidade) {
            throw new Error('Especialidade não encontrada.');
        }
        return especialidade;
    }

    async create(data) {
        // Verifica se já existe uma especialidade com o mesmo nome
        const existente = await especialidadeRepository.findByNome(data.nome);
        if (existente) {
            throw new Error('Já existe uma especialidade com este nome.');
        }

        const especialidade = await especialidadeRepository.create(data);
        logger.info(`Especialidade criada: ${especialidade.nome}`);
        return especialidade;
    }

    async update(id, data) {
        // Verifica se a especialidade existe
        const especialidade = await especialidadeRepository.findById(id);
        if (!especialidade) {
            throw new Error('Especialidade não encontrada.');
        }

        // Verifica se o novo nome já está em uso por outra especialidade
        const existente = await especialidadeRepository.findByNome(data.nome);
        if (existente && existente.id !== parseInt(id)) {
            throw new Error('Já existe uma especialidade com este nome.');
        }

        const atualizada = await especialidadeRepository.update(id, data);
        logger.info(`Especialidade ID ${id} atualizada para: ${data.nome}`);
        return atualizada;
    }

    async delete(id) {
        // Verifica se a especialidade existe
        const especialidade = await especialidadeRepository.findById(id);
        if (!especialidade) {
            throw new Error('Especialidade não encontrada.');
        }

        // Verifica se há empresas vinculadas antes de deletar
        const vinculos = await empresaEspecialidadeRepository.findByEspecialidadeId(id);
        if (vinculos.length > 0) {
            throw new Error('Não é possível excluir uma especialidade que possui empresas vinculadas.');
        }

        await especialidadeRepository.delete(id);
        logger.info(`Especialidade ID ${id} removida.`);
    }
}

module.exports = new EspecialidadeService();
