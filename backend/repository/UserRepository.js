const { User } = require('../model/index'); // Importa o modelo através da central do banco

class UserRepository {
    // Busca um usuário por e-mail [RF001]
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // Cria um novo registro de usuário no banco de dados [RF002]
    async create(userData) {
        return await User.create(userData);
    }

    // Busca um usuário pelo ID único (UUID)
    async findById(id) {
        return await User.findByPk(id);
    }
}

module.exports = new UserRepository();