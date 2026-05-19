const userRepository = require('../repository/repository');

class UserService {
    // Regra de negócio para criar nova conta
    async registerAccount(userData) {
        // 1. Verifica se o usuário já existe na base
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists) {
            throw new Error('Este e-mail já está cadastrado no WorkStock.');
        }

        // 2. Encaminha para a criação se tudo estiver correto
        // Nota: Futuramente, criptografaremos a senha aqui antes de enviar ao repository
        return await userRepository.create(userData);
    }

    // Regra de negócio para validação de sessão (Login)
    async authenticateLogin(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('CNPJ (CPF) ou senha inválidos. Tente novamente.');
        }

        // Nota: Futuramente faremos a comparação do hash da senha aqui
        if (user.passwordHash !== password) {
            throw new Error('CNPJ (CPF) ou senha inválidos. Tente novamente.');
        }

        return user;
    }
}

module.exports = new UserService();