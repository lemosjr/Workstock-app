const userRepository = require('../repository/UserRepository');
const refreshTokenRepository = require('../repository/RefreshTokenRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const logger = require('../config/logger');

class UserService {
    // Gera Access Token (curta duração)
    generateAccessToken(user) {
        return jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                tipo_usuario: user.tipo_usuario 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '15m' } // Access Token: 15 minutos
        );
    }

    // Gera Refresh Token (longa duração)
    async generateRefreshToken(user, userAgent, ipAddress) {
        const refreshToken = crypto.randomBytes(40).toString('hex');
        
        // Refresh Token expira em 7 dias
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        
        await refreshTokenRepository.create({
            token: refreshToken,
            id_usuario: user.id,
            expires_at: expiresAt,
            user_agent: userAgent,
            ip_address: ipAddress
        });
        
        return refreshToken;
    }

    // C - CREATE: Cadastro com Criptografia de Senha
    async registerAccount(userData, userAgent, ipAddress) {
        // Verifica duplicidade por E-mail
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists) {
            logger.warn(`Tentativa de cadastro com e-mail já existente: ${userData.email}`);
            throw new Error('Este endereço de e-mail já está cadastrado no sistema.');
        }

        // Verifica duplicidade por CPF/CNPJ
        const cpfCnpjExists = await userRepository.findByCpfCnpj(userData.cpf_cnpj);
        if (cpfCnpjExists) {
            logger.warn(`Tentativa de cadastro com CPF/CNPJ já existente: ${userData.cpf_cnpj}`);
            throw new Error('Este CPF ou CNPJ já está vinculado a uma conta.');
        }

        // Gera o hash seguro da senha
        const salt = await bcrypt.genSalt(10);
        const securedHash = await bcrypt.hash(userData.senha, salt);

        // Prepara o objeto
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
        const user = await userRepository.create(databasePayload);
        
        // Gera tokens
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user, userAgent, ipAddress);
        
        return {
            user: {
                id: user.id,
                nome_razao: user.nome_razao,
                email: user.email,
                tipo_usuario: user.tipo_usuario
            },
            accessToken,
            refreshToken
        };
    }

    // R - READ: Login com Geração de Tokens
    async authenticateLogin(email, plainPassword, userAgent, ipAddress) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            logger.warn(`Tentativa de login falhou - E-mail não encontrado: ${email}`);
            throw new Error('E-mail ou senha inválidos. Tente novamente.');
        }

        // Compara a senha
        const isPasswordValid = await bcrypt.compare(plainPassword, user.senha_hash);
        if (!isPasswordValid) {
            logger.warn(`Tentativa de login falhou - Senha incorreta para o e-mail: ${email}`);
            throw new Error('E-mail ou senha inválidos. Tente novamente.');
        }

        // Gera tokens
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user, userAgent, ipAddress);

        logger.info(`Usuário autenticado com sucesso: ${email}`);
        
        return {
            user: {
                id: user.id,
                nome_razao: user.nome_razao,
                email: user.email,
                tipo_usuario: user.tipo_usuario
            },
            accessToken,
            refreshToken
        };
    }

    // Refresh Token: Renova o Access Token
    async refreshAccessToken(refreshToken, userAgent, ipAddress) {
        // Verifica se o refresh token existe e é válido
        const storedToken = await refreshTokenRepository.findByToken(refreshToken);
        
        if (!storedToken) {
            throw new Error('Refresh token inválido ou expirado.');
        }

        // Verifica se o token pertence ao mesmo dispositivo/IP
        if (storedToken.user_agent !== userAgent) {
            logger.warn(`Refresh token usado em dispositivo diferente: ${userAgent} vs ${storedToken.user_agent}`);
            // Opcional: revogar token por segurança
            await refreshTokenRepository.revokeToken(refreshToken);
            throw new Error('Refresh token inválido para este dispositivo.');
        }

        // Busca o usuário
        const user = await userRepository.findById(storedToken.id_usuario);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        // Gera novo access token
        const newAccessToken = this.generateAccessToken(user);
        
        logger.info(`Access token renovado para usuário ID ${user.id}`);
        
        return {
            accessToken: newAccessToken,
            user: {
                id: user.id,
                nome_razao: user.nome_razao,
                email: user.email,
                tipo_usuario: user.tipo_usuario
            }
        };
    }

    // Logout: Revoga o refresh token
    async logout(refreshToken) {
        await refreshTokenRepository.revokeToken(refreshToken);
        logger.info(`Refresh token revogado: ${refreshToken.substring(0, 20)}...`);
        return true;
    }

    // Logout de todos os dispositivos
    async logoutAllDevices(userId) {
        await refreshTokenRepository.revokeAllUserTokens(userId);
        logger.info(`Todos os refresh tokens revogados para usuário ID ${userId}`);
        return true;
    }

    // Resto dos métodos existentes (getAllUsers, getUserById, etc.)
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não localizado no banco de dados.');
        }
        return user;
    }

    async updateUserProfile(id, updateData) {
        if (updateData.email) {
            const emailOwner = await userRepository.findByEmail(updateData.email);
            if (emailOwner && emailOwner.id !== Number(id)) {
                throw new Error('Este endereço de e-mail já pertence a outro usuário.');
            }
        }

        if (updateData.senha) {
            const salt = await bcrypt.genSalt(10);
            updateData.senha_hash = await bcrypt.hash(updateData.senha, salt);
            delete updateData.senha;
        }

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

    async deleteUserAccount(id) {
        // Revoga todos os refresh tokens antes de deletar
        await refreshTokenRepository.revokeAllUserTokens(id);
        
        const isDeleted = await userRepository.delete(id);
        if (!isDeleted) {
            throw new Error('Usuário não localizado para exclusão.');
        }
        logger.info(`Conta do usuário ID ${id} removida do banco de dados.`);
        return true;
    }
}

module.exports = new UserService();