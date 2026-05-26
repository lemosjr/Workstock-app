module.exports = {
    User: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome_razao: { type: 'string', example: 'Lemos Reformas LTDA' },
            email: { type: 'string', example: 'lemos@workstock.com' },
            tipo_usuario: { type: 'string', enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'], example: 'EMPRESA' }
        }
    },
    UserRegister: {
        type: 'object',
        required: ['nome_razao', 'email', 'cpf_cnpj', 'senha', 'tipo_usuario'],
        properties: {
            nome_razao: { type: 'string', example: 'Lemos Reformas' },
            email: { type: 'string', example: 'lemos@workstock.com' },
            cpf_cnpj: { type: 'string', example: '12345678000199' },
            senha: { type: 'string', example: 'senhaSegura123' },
            telefone: { type: 'string', example: '85999999999' },
            foto_perfil: { type: 'string', example: 'https://foto.com/perfil.jpg' },
            tipo_usuario: { type: 'string', enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'], example: 'EMPRESA' }
        }
    },
    UserLogin: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
            email: { type: 'string', example: 'lemos@workstock.com' },
            senha: { type: 'string', example: 'senhaSegura123' }
        }
    },
    UserUpdate: {
        type: 'object',
        properties: {
            nome_razao: { type: 'string', example: 'Nova Razão Social' },
            email: { type: 'string', example: 'novoemail@email.com' },
            senha: { type: 'string', example: 'novaSenha123' },
            telefone: { type: 'string', example: '85988888888' },
            foto_perfil: { type: 'string', example: 'https://nova-foto.com/perfil.jpg' }
        }
    },
    UserResponse: {
        type: 'object',
        properties: {
            message: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
            token: { type: 'string' }
        }
    }
};