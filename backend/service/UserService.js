const userRepository = require('../repository/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

class UserService {
    // C - CREATE: Cadastro com Criptografia de Senha (bcryptjs) [RF002]
    async registerAccount(userData) {
        // Verifica duplicidade por E-mail
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists) {
            logger.warn(`Tentativa de cadastro com e-mail já existente: ${userData.email}`);
            throw new Error('Este endereço de e-mail já está cadastrado no sistema.');
        }

        // Verifica duplicidade por CPF/CNPJ (conforme o diagrama banco_de_dados.jpg)
        const cpfCnpjExists = await userRepository.findByCpfCnpj(userData.cpf_cnpj);
        if (cpfCnpjExists) {
            logger.warn(`Tentativa de cadastro com CPF/CNPJ já existente: ${userData.cpf_cnpj}`);
            throw new Error('Este CPF ou CNPJ já está vinculado a uma conta.');
        }

        // Gera o hash seguro da senha (10 saltos criptográficos)
        const salt = await bcrypt.genSalt(10);
        const securedHash = await bcrypt.hash(userData.senha, salt);

        // Prepara o objeto injetando o hash na coluna correta do banco
        const databasePayload = {
            nome_razao: userData.nome_razao,
            email: userData.email,
            cpf_cnpj: userData.cpf_cnpj,
            senha_hash: securedHash,
            telefone: userData.telefone || null,
            foto_perfil: userData.foto_perfil || null,
            tipo_usuario: userData.tipo_usuario
        };

        logger.info(`Criando nova conta para o usuário: ${userData.email} [${userData.tipo_usuario}]`);
        return await userRepository.create(databasePayload);
    }

    // R - READ: Login com Geração de Token Assinado (JWT) [RF001]
    async authenticateLogin(email, plainPassword) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            logger.warn(`Tentativa de login falhou - E-mail não encontrado: ${email}`);
            throw new Error('E-mail ou senha inválidos. Tente novamente.');
        }

        // Compara a senha digitada em texto limpo com o hash seguro do PostgreSQL
        const isPasswordValid = await bcrypt.compare(plainPassword, user.senha_hash);
        if (!isPasswordValid) {
            logger.warn(`Tentativa de login falhou - Senha incorreta para o e-mail: ${email}`);
            throw new Error('E-mail ou senha inválidos. Tente novamente.');
        }

        // Gera o token JWT assinado com a nossa chave secreta do .env
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                tipo_usuario: user.tipo_usuario 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
        );

        logger.info(`Usuário autenticado com sucesso via JWT: ${email}`);
        
        return {
            user: {
                id: user.id,
                nome_razao: user.nome_razao,
                email: user.email,
                tipo_usuario: user.tipo_usuario
            },
            token
        };
    }

    // R - READ: Listar todos os usuários
    async getAllUsers() {
        return await userRepository.findAll();
    }

    // R - READ: Buscar perfil específico por ID
    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não localizado no banco de dados.');
        }
        return user;
    }

    // U - UPDATE: Editar dados do perfil cadastrado [RF004]
    async updateUserProfile(id, updateData) {
        if (updateData.email) {
            const emailOwner = await userRepository.findByEmail(updateData.email);
            if (emailOwner && emailOwner.id !== Number(id)) {
                throw new Error('Este endereço de e-mail já pertence a outro usuário.');
            }
        }

        // Se o usuário estiver atualizando a senha, precisamos gerar um novo hash
        if (updateData.senha) {
            const salt = await bcrypt.genSalt(10);
            updateData.senha_hash = await bcrypt.hash(updateData.senha, salt);
            delete updateData.senha; // Remove o campo em texto limpo
        }

        // Bloqueia alteração direta de nível de acesso (role) por segurança básica
        if (updateData.tipo_usuario) {
            delete updateData.tipo_usuario;
        }

        const updatedUser = await userRepository.update(id, updateData);
        if (!updatedUser) {
            throw new Error('Perfil de usuário não encontrado para atualização.');
        }

        logger.info(`Perfil do usuário ID ${id} atualizado com sucesso.`);
        return updatedUser;
    }

    // D - DELETE: Remover conta do usuário do banco de dados
    async deleteUserAccount(id) {
        const isDeleted = await userRepository.delete(id);
        if (!isDeleted) {
            throw new Error('Usuário não localizado para exclusão.');
        }
        logger.info(`Conta do usuário ID ${id} removida do banco de dados.`);
        return true;
    }
}

module.exports = new UserService();