module.exports = {
    // ==========================================
    // GET - Listar histórico do serviço
    // ==========================================
    '/services/{id}/historico': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Buscar histórico completo de um serviço',
            description: 'Retorna todo o histórico de mudanças de status e observações de um serviço específico',
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
                404: {
                    description: 'Serviço não encontrado.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    // ==========================================
    // GET - Timeline completa
    // ==========================================
    '/services/{id}/timeline': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Buscar timeline completa de um serviço',
            description: 'Retorna uma timeline detalhada incluindo mudanças de status e observações manuais',
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
                404: {
                    description: 'Serviço não encontrado.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    // ==========================================
    // GET - Buscar registro específico do histórico
    // ==========================================
    '/historico/{historicoId}': {
        get: {
            tags: ['Histórico de Serviços'],
            summary: 'Buscar um registro específico do histórico por ID',
            description: 'Retorna os detalhes de um único registro histórico (apenas ADMIN ou dono do serviço)',
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
                    description: 'Registro histórico encontrado.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Historico' }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado.' },
                404: { description: 'Registro histórico não encontrado.' }
            }
        }
    },

    // ==========================================
    // POST - Adicionar observação manual
    // ==========================================
    '/services/{id}/historico/observacao': {
        post: {
            tags: ['Histórico de Serviços'],
            summary: 'Adicionar observação manual ao histórico',
            description: 'Adiciona uma observação manual ao histórico do serviço (apenas dono do serviço ou ADMIN)',
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
                                    message: { type: 'string', example: 'Observação adicionada ao histórico com sucesso!' },
                                    data: { $ref: '#/components/schemas/Historico' }
                                }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Você não tem permissão.' },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    },

    // ==========================================
    // PUT - Atualizar observação do histórico
    // ==========================================
    '/historico/{historicoId}': {
        put: {
            tags: ['Histórico de Serviços'],
            summary: 'Atualizar uma observação do histórico',
            description: 'Atualiza o comentário ou observação de um registro histórico (apenas ADMIN ou dono do serviço)',
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
                    description: 'Registro histórico atualizado com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Registro histórico atualizado com sucesso!' },
                                    data: { $ref: '#/components/schemas/Historico' }
                                }
                            }
                        }
                    }
                },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas o dono do serviço ou ADMIN podem editar.' },
                404: { description: 'Registro histórico não encontrado.' }
            }
        }
    },

    // ==========================================
    // DELETE - Remover registro do histórico
    // ==========================================
    '/historico/{historicoId}': {
        delete: {
            tags: ['Histórico de Serviços'],
            summary: 'Remover um registro do histórico',
            description: 'Remove permanentemente um registro histórico (apenas ADMIN)',
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
                    description: 'Registro histórico removido com sucesso.',
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
                403: { description: 'Acesso negado. Apenas administradores podem remover registros históricos.' },
                404: { description: 'Registro histórico não encontrado.' }
            }
        }
    },

    // ==========================================
    // DELETE - Remover todos registros de um serviço
    // ==========================================
    '/services/{id}/historico': {
        delete: {
            tags: ['Histórico de Serviços'],
            summary: 'Remover todo o histórico de um serviço',
            description: 'Remove permanentemente todos os registros históricos de um serviço específico (apenas ADMIN)',
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
                    description: 'Histórico do serviço removido com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Todo o histórico do serviço foi removido com sucesso!' },
                                    total_removidos: { type: 'integer' }
                                }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas administradores podem remover histórico.' },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    }
};