module.exports = {
    '/users': {
        get: {
            tags: ['Autenticação e Usuários'],
            summary: 'Listar todos os usuários (Apenas ADMIN)',
            description: 'Retorna uma lista paginada de usuários. Apenas administradores podem acessar.',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    schema: { type: 'integer', default: 1, minimum: 1 },
                    description: 'Número da página'
                },
                {
                    name: 'limit',
                    in: 'query',
                    schema: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
                    description: 'Quantidade de itens por página'
                },
                {
                    name: 'tipo_usuario',
                    in: 'query',
                    schema: { 
                        type: 'string', 
                        enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'] 
                    },
                    description: 'Filtrar por tipo de usuário'
                },
                {
                    name: 'nome',
                    in: 'query',
                    schema: { type: 'string' },
                    description: 'Filtrar por nome ou razão social (busca parcial)'
                }
            ],
            responses: {
                200: {
                    description: 'Lista de usuários retornada com paginação.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    users: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/User' }
                                    },
                                    pagination: {
                                        $ref: '#/components/schemas/Pagination'
                                    }
                                }
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
            description: 'Retorna os detalhes de um usuário específico.',
            security: [{ BearerAuth: [] }],
            parameters: [
                { 
                    name: 'id', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID do usuário' 
                }
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
                401: { description: 'Token não fornecido ou inválido.' },
                404: { description: 'Usuário não encontrado.' }
            }
        },
        put: {
            tags: ['Autenticação e Usuários'],
            summary: 'Atualizar dados do perfil [RF004]',
            description: 'Atualiza os dados do perfil. Apenas o próprio usuário ou ADMIN podem executar esta ação.',
            security: [{ BearerAuth: [] }],
            parameters: [
                { 
                    name: 'id', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID do usuário' 
                }
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
                            schema: { $ref: '#/components/schemas/UserUpdateResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Você só pode modificar sua própria conta.' },
                404: { description: 'Usuário não encontrado.' }
            }
        },
        delete: {
            tags: ['Autenticação e Usuários'],
            summary: 'Excluir conta de usuário',
            description: 'Remove permanentemente a conta do usuário. Apenas o próprio usuário ou ADMIN podem executar esta ação.',
            security: [{ BearerAuth: [] }],
            parameters: [
                { 
                    name: 'id', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID do usuário' 
                }
            ],
            responses: {
                200: {
                    description: 'Conta excluída com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UserDeleteResponse' }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Você só pode excluir sua própria conta.' },
                404: { description: 'Usuário não encontrado.' }
            }
        }
    }
};