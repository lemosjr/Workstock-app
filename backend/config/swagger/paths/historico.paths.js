module.exports = {
    // ==========================================
    // GET /services/{id}/historico
    // ==========================================
    '/services/{id}/historico': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Listar todo o histórico do serviço',
            description: 'Retorna todas as mudanças de status e observações de um serviço específico.',
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
                200: {
                    description: 'Histórico retornado com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    service_id: { type: 'integer' },
                                    total_registros: { type: 'integer' },
                                    historico: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Historico' }
                                    }
                                }
                            }
                        }
                    }
                },
                404: { description: 'Serviço não encontrado.' }
            }
        },
        delete: {
            tags: ['Histórico de Serviços'],
            summary: 'Remover todo o histórico do serviço',
            description: 'Remove permanentemente todos os registros históricos de um serviço. Apenas ADMIN.',
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
                200: {
                    description: 'Histórico removido com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    total_removidos: { type: 'integer' }
                                }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas ADMIN.' },
                404: { description: 'Serviço não encontrado.' }
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
            description: 'Retorna uma linha do tempo detalhada com todas as mudanças de status e observações.',
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
                200: {
                    description: 'Timeline retornada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Timeline' }
                        }
                    }
                },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    },

    // ==========================================
    // /historico/{historicoId} (GET, PUT, DELETE)
    // ==========================================
    '/historico/{historicoId}': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Buscar registro histórico por ID',
            description: 'Retorna os detalhes de um único registro histórico. Requer autenticação.',
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
                200: {
                    description: 'Registro encontrado.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Historico' }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Registro não encontrado.' }
            }
        },
        put: {
            tags: ['Histórico de Serviços'],
            summary: 'Atualizar observação do histórico',
            description: 'Atualiza o comentário ou observação de um registro histórico. Apenas o dono do serviço ou ADMIN.',
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
                                    maxLength: 255,
                                    example: 'Comentário atualizado'
                                },
                                observacao: {
                                    type: 'string',
                                    maxLength: 1000,
                                    example: 'Observação atualizada com novas informações'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Registro atualizado com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    data: { $ref: '#/components/schemas/Historico' }
                                }
                            }
                        }
                    }
                },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Registro não encontrado.' }
            }
        },
        delete: {
            tags: ['Histórico de Serviços'],
            summary: 'Remover registro histórico',
            description: 'Remove permanentemente um registro específico do histórico. Apenas ADMIN.',
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
                200: {
                    description: 'Registro removido com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Registro histórico removido com sucesso!' }
                                }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
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
            description: 'Adiciona uma observação manual ao histórico do serviço. Apenas o dono do serviço ou ADMIN.',
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
                            required: [],
                            properties: {
                                comentario: {
                                    type: 'string',
                                    maxLength: 255,
                                    example: 'Cliente solicitou alteração no prazo'
                                },
                                observacao: {
                                    type: 'string',
                                    maxLength: 1000,
                                    example: 'Cliente pediu para antecipar o serviço para a próxima semana'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Observação adicionada com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    data: { $ref: '#/components/schemas/Historico' }
                                }
                            }
                        }
                    }
                },
                400: { description: 'Dados inválidos (necessário comentário ou observação).' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    },

    // ==========================================
    // GET /admin/historico (com paginação)
    // ==========================================
    '/admin/historico': {
        get: {
            tags: ['Administração'],
            summary: 'Listar todo o histórico do sistema',
            description: 'Retorna uma lista paginada de todos os registros históricos do sistema. Apenas ADMIN.',
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
                    schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
                    description: 'Quantidade de itens por página'
                },
                {
                    name: 'startDate',
                    in: 'query',
                    schema: { type: 'string', format: 'date' },
                    description: 'Data inicial para filtro (YYYY-MM-DD)'
                },
                {
                    name: 'endDate',
                    in: 'query',
                    schema: { type: 'string', format: 'date' },
                    description: 'Data final para filtro (YYYY-MM-DD)'
                },
                {
                    name: 'status_anterior',
                    in: 'query',
                    schema: { 
                        type: 'string', 
                        enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'] 
                    },
                    description: 'Filtrar por status anterior'
                },
                {
                    name: 'status_novo',
                    in: 'query',
                    schema: { 
                        type: 'string', 
                        enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'] 
                    },
                    description: 'Filtrar por status novo'
                }
            ],
            responses: {
                200: {
                    description: 'Histórico retornado com paginação.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    historico: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Historico' }
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
                403: { description: 'Acesso negado. Apenas ADMIN.' }
            }
        }
    }
};