const { User } = require('../model/index');
const logger = require('../config/logger');

class UserRepository {
    // C - CREATE: Insere um novo usuário na tabela 'usuario'
    async create(userData) {
        try {
            return await User.create(userData);
        } catch (error) {
            logger.error(`Erro ao criar registro no banco (Repository): ${error.message}`);
            throw error;
        }
    }

    // R - READ: Localiza o usuário através do e-mail exclusivo (Usado no Login)
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // R - READ: Localiza o usuário pelo CPF ou CNPJ único
    async findByCpfCnpj(cpf_cnpj) {
        return await User.findOne({ where: { cpf_cnpj } });
    }

    // R - READ: Busca o usuário pela chave primária (ID Integer)
    async findById(id) {
        return await User.findByPk(id);
    }

    // R - READ: Retorna todos os registros da tabela 'usuario' para painéis
    async findAll() {
        return await User.findAll({
            attributes: { exclude: ['senha_hash'] }, // Nunca vaza a senha hash pelas requisições
            order: [['nome_razao', 'ASC']]
        });
    }

    // U - UPDATE: Atualiza os dados cadastrais (como foto_perfil, telefone)
    async update(id, updateData) {
        const user = await this.findById(id);
        if (!user) return null;
        
        return await user.update(updateData);
    }

    // D - DELETE: Remove fisicamente o usuário do banco de dados
    async delete(id) {
        const user = await this.findById(id);
        if (!user) return false;
        
        await user.destroy();
        return true;
    }
}

module.exports = new UserRepository();