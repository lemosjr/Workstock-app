module.exports = {
    '/auth/register': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Cadastrar uma nova conta de usuário [RF002]',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserRegister' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Conta criada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos ou cadastros duplicados.' }
            }
        }
    },
    '/auth/login': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Efetuar login no sistema [RF001]',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserLogin' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Login efetuado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserResponse' }
                        }
                    }
                },
                401: { description: 'Credenciais inválidas.' }
            }
        }
    }
};