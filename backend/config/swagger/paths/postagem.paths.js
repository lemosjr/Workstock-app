const postagemPaths = {
    '/postagens': {
        get: {
            tags: ['Postagens'],
            summary: 'Lista todas as postagens (feed geral)',
            responses: {
                200: {
                    description: 'Lista de postagens',
                    content: {
                        'application/json': {
                            schema: { type: 'array', items: { $ref: '#/components/schemas/Postagem' } }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Postagens'],
            summary: 'Cria uma nova postagem',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/PostagemInput' }
                    }
                }
            },
            responses: {
                201: { description: 'Postagem criada com sucesso' },
                401: { description: 'Não autenticado' }
            }
        }
    },
    '/postagens/{id}': {
        get: {
            tags: ['Postagens'],
            summary: 'Busca uma postagem específica pelo ID',
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
            ],
            responses: {
                200: {
                    description: 'Postagem encontrada',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Postagem' }
                        }
                    }
                },
                404: { description: 'Postagem não encontrada' }
            }
        },
        put: {
            tags: ['Postagens'],
            summary: 'Atualiza uma postagem (dono ou ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/PostagemInput' }
                    }
                }
            },
            responses: {
                200: { description: 'Postagem atualizada' },
                401: { description: 'Não autenticado' },
                404: { description: 'Postagem não encontrada' }
            }
        },
        delete: {
            tags: ['Postagens'],
            summary: 'Deleta uma postagem (dono ou ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
            ],
            responses: {
                204: { description: 'Postagem deletada' },
                401: { description: 'Não autenticado' },
                404: { description: 'Postagem não encontrada' }
            }
        }
    },
    '/postagens/usuario/{userId}': {
        get: {
            tags: ['Postagens'],
            summary: 'Lista postagens de um usuário/empresa específico',
            parameters: [
                { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } }
            ],
            responses: {
                200: {
                    description: 'Lista de postagens do usuário',
                    content: {
                        'application/json': {
                            schema: { type: 'array', items: { $ref: '#/components/schemas/Postagem' } }
                        }
                    }
                }
            }
        }
    }
};

module.exports = postagemPaths;
