const User = require('../model/model');

class UserRepository {
    // Busca um usuário por e-mail (Usado no fluxo de login [RF001])
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // Cria um novo usuário no banco (Usado no cadastro de conta [RF002])
    async create(userData) {
        return await User.create(userData);
    }

    // Busca um usuário pelo ID específico
    async findById(id) {
        return await User.findByPk(id);
    }
}

module.exports = new UserRepository();