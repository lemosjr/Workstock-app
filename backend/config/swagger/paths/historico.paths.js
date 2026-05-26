module.exports = {
    // ==========================================
    // GET /services/{id}/historico
    // ==========================================
    '/services/{id}/historico': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Listar todo o histórico do serviço',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do serviço'
                }
            ],
            responses: {
                200: { description: 'Histórico retornado com sucesso.' },
                404: { description: 'Serviço não encontrado.' }
            }
        },
        delete: {
            tags: ['Histórico de Serviços'],
            summary: 'Remover todo o histórico do serviço',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do serviço'
                }
            ],
            responses: {
                200: { description: 'Histórico removido com sucesso.' },
                401: { description: 'Token não fornecido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' }
            }
        }
    },

    // ==========================================
    // GET /services/{id}/timeline
    // ==========================================
    '/services/{id}/timeline': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Ver timeline completa do serviço',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do serviço'
                }
            ],
            responses: {
                200: { description: 'Timeline retornada com sucesso.' },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    },

    // ==========================================
    // /historico/{historicoId} (GET, PUT, DELETE juntos)
    // ==========================================
    '/historico/{historicoId}': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Buscar registro histórico por ID',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'historicoId',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do registro histórico'
                }
            ],
            responses: {
                200: { description: 'Registro encontrado.' },
                401: { description: 'Token não fornecido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Registro não encontrado.' }
            }
        },
        put: {
            tags: ['Histórico de Serviços'],
            summary: 'Atualizar observação do histórico',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'historicoId',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do registro histórico'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                comentario: {
                                    type: 'string',
                                    example: 'Comentário atualizado'
                                },
                                observacao: {
                                    type: 'string',
                                    example: 'Observação atualizada'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Registro atualizado com sucesso.' },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Registro não encontrado.' }
            }
        },
        delete: {
            tags: ['Histórico de Serviços'],
            summary: 'Remover registro histórico',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'historicoId',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do registro histórico'
                }
            ],
            responses: {
                200: { description: 'Registro removido com sucesso.' },
                401: { description: 'Token não fornecido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' },
                404: { description: 'Registro não encontrado.' }
            }
        }
    },

    // ==========================================
    // POST /services/{id}/historico/observacao
    // ==========================================
    '/services/{id}/historico/observacao': {
        post: {
            tags: ['Histórico de Serviços'],
            summary: 'Adicionar observação ao histórico',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID do serviço'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                comentario: {
                                    type: 'string',
                                    example: 'Cliente solicitou alteração'
                                },
                                observacao: {
                                    type: 'string',
                                    example: 'Detalhamento da solicitação'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Observação adicionada com sucesso.' },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    },

    // ==========================================
    // GET /admin/historico
    // ==========================================
    '/admin/historico': {
        get: {
            tags: ['Administração'],
            summary: 'Listar todo o histórico do sistema',
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    schema: { type: 'integer', default: 1 },
                    description: 'Número da página'
                },
                {
                    name: 'limit',
                    in: 'query',
                    schema: { type: 'integer', default: 20 },
                    description: 'Itens por página'
                },
                {
                    name: 'startDate',
                    in: 'query',
                    schema: { type: 'string', format: 'date' },
                    description: 'Data inicial'
                },
                {
                    name: 'endDate',
                    in: 'query',
                    schema: { type: 'string', format: 'date' },
                    description: 'Data final'
                }
            ],
            responses: {
                200: { description: 'Histórico retornado com sucesso.' },
                401: { description: 'Token não fornecido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' }
            }
        }
    }
};