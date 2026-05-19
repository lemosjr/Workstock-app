const userRepository = require('../repository/UserRepository');

class UserService {
    // Regra de negócio para o Cadastro de Conta [RF002]
    async registerAccount(userData) {
        // Valida se o usuário já existe na base de dados com este e-mail [RF002]
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists) {
            throw new Error('Este e-mail já está cadastrado no WorkStock.');
        }

        // Encaminha os dados limpos para a persistência no banco
        return await userRepository.create(userData);
    }

    // Regra de negócio para o Efetuar login [RF001]
    async authenticateLogin(email, password) {
        const user = await userRepository.findByEmail(email);
        
        // Exceção (A01) - Credenciais inválidas descrita no caso de uso
        if (!user) {
            throw new Error('CNPJ (CPF) ou senha inválidos. Tente novamente.');
        }

        // Validação provisória de texto puro antes da criptografia
        if (user.passwordHash !== password) {
            throw new Error('CNPJ (CPF) ou senha inválidos. Tente novamente.');
        }

        return user;
    }
}

module.exports = new UserService();