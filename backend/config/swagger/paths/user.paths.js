module.exports = {
    '/users': {
        get: {
            tags: ['Autenticação e Usuários'],
            summary: 'Listar todos os usuários (Apenas ADMIN)',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Lista de usuários retornada.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/User' }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas administradores.' }
            }
        }
    },
    '/users/{id}': {
        get: {
            tags: ['Autenticação e Usuários'],
            summary: 'Buscar usuário por ID',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário' }
            ],
            responses: {
                200: {
                    description: 'Usuário encontrado.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' }
                        }
                    }
                },
                404: { description: 'Usuário não encontrado.' }
            }
        },
        put: {
            tags: ['Autenticação e Usuários'],
            summary: 'Atualizar dados do perfil [RF004] (Apenas próprio usuário ou ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário' }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserUpdate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Perfil atualizado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserResponse' }
                        }
                    }
                },
                403: { description: 'Acesso negado. Você só pode modificar sua própria conta.' }
            }
        },
        delete: {
            tags: ['Autenticação e Usuários'],
            summary: 'Excluir conta de usuário (Apenas próprio usuário ou ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário' }
            ],
            responses: {
                200: {
                    description: 'Conta excluída com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Conta de usuário excluída com sucesso do sistema.' }
                                }
                            }
                        }
                    }
                },
                403: { description: 'Acesso negado. Você só pode excluir sua própria conta.' }
            }
        }
    }
};