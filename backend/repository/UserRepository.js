const { User } = require('../model/index');

class UserRepository {
    // C - CREATE: Usado no cadastro [RF002]
    async create(userData) {
        return await User.create(userData);
    }

    // R - READ: Busca por e-mail [RF001]
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // R - READ: Busca por ID único (UUID)
    async findById(id) {
        return await User.findByPk(id);
    }

    // R - READ: Lista todos os usuários cadastrados (Para o painel administrativo)
    async findAll() {
        return await User.findAll({
            attributes: { exclude: ['passwordHash'] }, // Oculta o hash por segurança nativa
            order: [['name', 'ASC']]
        });
    }

    // U - UPDATE: Atualiza dados do perfil (Nome, e-mail, etc)
    async update(id, updateData) {
        const user = await this.findById(id);
        if (!user) return null;
        
        return await user.update(updateData);
    }

    // D - DELETE: Remove a conta do usuário do sistema
    async delete(id) {
        const user = await this.findById(id);
        if (!user) return false;
        
        await user.destroy();
        return true;
    }
}

module.exports = new UserRepository();