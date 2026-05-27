module.exports = {
    '/especialidades': {
        get: {
            tags: ['Especialidades'],
            summary: 'Listar todas as especialidades',
            responses: {
                200: {
                    description: 'Lista de especialidades.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Especialidade' }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Especialidades'],
            summary: 'Criar nova especialidade (apenas ADMIN)',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/EspecialidadeCreate' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Especialidade criada com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Especialidade criada com sucesso!' },
                                    data: { $ref: '#/components/schemas/Especialidade' }
                                }
                            }
                        }
                    }
                },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' }
            }
        }
    },
    '/especialidades/{id}': {
        get: {
            tags: ['Especialidades'],
            summary: 'Buscar especialidade por ID',
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da especialidade' }
            ],
            responses: {
                200: {
                    description: 'Especialidade encontrada.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Especialidade' }
                        }
                    }
                },
                404: { description: 'Especialidade não encontrada.' }
            }
        },
        put: {
            tags: ['Especialidades'],
            summary: 'Atualizar especialidade (apenas ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da especialidade' }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/EspecialidadeCreate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Especialidade atualizada com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Especialidade atualizada com sucesso!' },
                                    data: { $ref: '#/components/schemas/Especialidade' }
                                }
                            }
                        }
                    }
                },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' },
                404: { description: 'Especialidade não encontrada.' }
            }
        },
        delete: {
            tags: ['Especialidades'],
            summary: 'Deletar especialidade (apenas ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da especialidade' }
            ],
            responses: {
                200: {
                    description: 'Especialidade removida com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Especialidade removida com sucesso!' }
                                }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' },
                404: { description: 'Especialidade não encontrada.' }
            }
        }
    }
};
