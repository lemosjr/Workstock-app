const userRepository = require('../repository/UserRepository');

class UserService {
    // C - CREATE: Cadastro de Conta [RF002]
    async registerAccount(userData) {
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists) {
            throw new Error('Este e-mail já está cadastrado no WorkStock.');
        }
        return await userRepository.create(userData);
    }

    // R - READ: Login [RF001]
    async authenticateLogin(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('CNPJ (CPF) ou senha inválidos. Tente novamente.');
        }
        if (user.passwordHash !== password) {
            throw new Error('CNPJ (CPF) ou senha inválidos. Tente novamente.');
        }
        return user;
    }

    // R - READ: Buscar todos os usuários (Painel administrativo)
    async getAllUsers() {
        return await userRepository.findAll();
    }

    // R - READ: Buscar perfil específico por ID
    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado no sistema.');
        }
        return user;
    }

    // U - UPDATE: Editar dados cadastrais e de perfil [RF004]
    async updateUserProfile(id, updateData) {
        // Se estiver tentando alterar o e-mail, verifica se o novo e-mail já está em uso
        if (updateData.email) {
            const emailOwner = await userRepository.findByEmail(updateData.email);
            if (emailOwner && emailOwner.id !== id) {
                throw new Error('Este endereço de e-mail já está sendo utilizado por outro usuário.');
            }
        }

        // Impede a alteração maliciosa do nível de permissão (role) pela rota comum
        if (updateData.role) {
            delete updateData.role;
        }

        const updatedUser = await userRepository.update(id, updateData);
        if (!updatedUser) {
            throw new Error('Usuário não encontrado para atualização.');
        }

        return updatedUser;
    }

    // D - DELETE: Deletar conta de usuário do ecossistema
    async deleteUserAccount(id) {
        const isDeleted = await userRepository.delete(id);
        if (!isDeleted) {
            throw new Error('Usuário não encontrado para exclusão.');
        }
        return true;
    }
}

module.exports = new UserService();