module.exports = {
    // ==========================================
    // SCHEMAS BÁSICOS
    // ==========================================
    User: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome_razao: { type: 'string', example: 'Lemos Reformas LTDA' },
            email: { type: 'string', example: 'lemos@workstock.com' },
            tipo_usuario: { type: 'string', enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'], example: 'EMPRESA' }
        }
    },

    // ==========================================
    // REGISTRO
    // ==========================================
    UserRegister: {
        type: 'object',
        required: ['nome_razao', 'email', 'cpf_cnpj', 'senha', 'tipo_usuario'],
        properties: {
            nome_razao: { type: 'string', example: 'Lemos Reformas' },
            email: { type: 'string', example: 'lemos@workstock.com' },
            cpf_cnpj: { type: 'string', example: '12345678000199', description: 'CPF (11 dígitos) ou CNPJ (14 dígitos)' },
            senha: { type: 'string', example: 'SenhaForte@123', description: 'Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial' },
            telefone: { type: 'string', example: '85999999999' },
            foto_perfil: { type: 'string', example: 'https://foto.com/perfil.jpg' },
            tipo_usuario: { type: 'string', enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'], example: 'EMPRESA' }
        }
    },

    // ==========================================
    // LOGIN
    // ==========================================
    UserLogin: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
            email: { type: 'string', example: 'lemos@workstock.com' },
            senha: { type: 'string', example: 'SenhaForte@123' }
        }
    },

    // ==========================================
    // REFRESH TOKEN
    // ==========================================
    RefreshTokenRequest: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
            refreshToken: { type: 'string', example: 'abc123def456...' }
        }
    },

    // ==========================================
    // LOGOUT
    // ==========================================
    LogoutRequest: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
            refreshToken: { type: 'string', example: 'abc123def456...' }
        }
    },

    // ==========================================
    // RECUPERAÇÃO DE SENHA
    // ==========================================
    RecuperarSenhaRequest: {
        type: 'object',
        required: ['email'],
        properties: {
            email: { type: 'string', example: 'usuario@email.com' }
        }
    },

    RedefinirSenhaRequest: {
        type: 'object',
        required: ['email', 'otp', 'novaSenha', 'confirmarSenha'],
        properties: {
            email: { type: 'string', example: 'usuario@email.com' },
            otp: { type: 'string', example: '123456', description: 'Código de 6 dígitos recebido por e-mail' },
            novaSenha: { type: 'string', example: 'NovaSenhaForte@123', description: 'Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial' },
            confirmarSenha: { type: 'string', example: 'NovaSenhaForte@123' }
        }
    },

    // ==========================================
    // ATUALIZAÇÃO DE PERFIL
    // ==========================================
    UserUpdate: {
        type: 'object',
        properties: {
            nome_razao: { type: 'string', example: 'Nova Razão Social' },
            email: { type: 'string', example: 'novoemail@email.com' },
            senha: { type: 'string', example: 'NovaSenhaForte@123', description: 'Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial' },
            telefone: { type: 'string', example: '85988888888' },
            foto_perfil: { type: 'string', example: 'https://nova-foto.com/perfil.jpg' }
        }
    },

    // ==========================================
    // RESPOSTAS
    // ==========================================
    AuthResponse: {
        type: 'object',
        properties: {
            message: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' }
        }
    },

    RefreshTokenResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Token renovado com sucesso!' },
            accessToken: { type: 'string' },
            user: { $ref: '#/components/schemas/User' }
        }
    },

    LogoutResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Logout realizado com sucesso!' }
        }
    },

    LogoutAllResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Logout de todos os dispositivos realizado com sucesso!' }
        }
    },

    RecuperarSenhaResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Código de recuperação enviado para seu e-mail.' }
        }
    },

    RedefinirSenhaResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Senha redefinida com sucesso.' }
        }
    },

    UserUpdateResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Dados de perfil atualizados com sucesso!' },
            user: { $ref: '#/components/schemas/User' }
        }
    },

    UserDeleteResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Conta de usuário excluída com sucesso do sistema.' }
        }
    },

    // Mantido para compatibilidade (se necessário)
    UserResponse: {
        type: 'object',
        properties: {
            message: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
            token: { type: 'string' }
        }
    }
};