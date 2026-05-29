module.exports = {
    // ==========================================
    // SCHEMA PRINCIPAL FOOD-JMR2XU
    // ==========================================
    Historico: {
        type: 'object',
        properties: {
            id: { 
                type: 'integer', 
                example: 1,
                description: 'ID único do registro histórico'
            },
            id_service: { 
                type: 'integer', 
                example: 10,
                description: 'ID do serviço relacionado'
            },
            status_anterior: {
                type: 'string',
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                example: 'ABERTO',
                description: 'Status antes da alteração'
            },
            status_novo: {
                type: 'string',
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                example: 'EM_ANDAMENTO',
                description: 'Status após a alteração'
            },
            comentario: { 
                type: 'string', 
                example: 'Status alterado durante a execução do serviço',
                maxLength: 255,
                description: 'Comentário resumido sobre a alteração'
            },
            observacao: { 
                type: 'string', 
                example: 'Cliente solicitou alteração na cor da pintura',
                maxLength: 1000,
                description: 'Observação detalhada sobre a alteração'
            },
            data_hora: { 
                type: 'string', 
                format: 'date-time', 
                example: '2024-01-15T10:30:00.000Z',
                description: 'Data e hora do registro'
            }
        }
    },

    // ==========================================
    // REQUISIÇÕES
    // ==========================================
    HistoricoObservacaoCreate: {
        type: 'object',
        properties: {
            comentario: {
                type: 'string',
                minLength: 3,
                maxLength: 255,
                example: 'Cliente solicitou alteração no prazo',
                description: 'Comentário resumido sobre a observação'
            },
            observacao: {
                type: 'string',
                minLength: 5,
                maxLength: 1000,
                example: 'Cliente pediu para antecipar o serviço para a próxima semana devido a uma emergência',
                description: 'Observação detalhada sobre o ocorrido'
            }
        }
    },

    HistoricoObservacaoUpdate: {
        type: 'object',
        properties: {
            comentario: {
                type: 'string',
                minLength: 3,
                maxLength: 255,
                example: 'Comentário atualizado com novas informações',
                description: 'Comentário resumido atualizado'
            },
            observacao: {
                type: 'string',
                minLength: 5,
                maxLength: 1000,
                example: 'Observação atualizada com detalhes adicionais sobre o andamento do serviço',
                description: 'Observação detalhada atualizada'
            }
        }
    },

    // ==========================================
    // RESPOSTAS - SERVIÇO ESPECÍFICO
    // ==========================================
    HistoricoListResponse: {
        type: 'object',
        properties: {
            service_id: { 
                type: 'integer', 
                example: 10,
                description: 'ID do serviço'
            },
            total_registros: { 
                type: 'integer', 
                example: 5,
                description: 'Número total de registros no histórico'
            },
            historico: {
                type: 'array',
                items: { $ref: '#/components/schemas/Historico' },
                description: 'Lista de registros históricos'
            }
        }
    },

    HistoricoSingleResponse: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_service: { type: 'integer', example: 10 },
            status_anterior: { type: 'string', example: 'ABERTO' },
            status_novo: { type: 'string', example: 'EM_ANDAMENTO' },
            comentario: { type: 'string', example: 'Status alterado' },
            observacao: { type: 'string', example: 'Detalhamento' },
            data_hora: { type: 'string', format: 'date-time' }
        }
    },

    HistoricoMutationResponse: {
        type: 'object',
        properties: {
            message: { 
                type: 'string', 
                example: 'Observação adicionada ao histórico com sucesso!' 
            },
            data: { $ref: '#/components/schemas/Historico' }
        }
    },

    HistoricoDeleteResponse: {
        type: 'object',
        properties: {
            message: { 
                type: 'string', 
                example: 'Registro histórico removido com sucesso!' 
            }
        }
    },

    HistoricoMassDeleteResponse: {
        type: 'object',
        properties: {
            message: { 
                type: 'string', 
                example: 'Todo o histórico do serviço foi removido com sucesso!' 
            },
            total_removidos: { 
                type: 'integer', 
                example: 8,
                description: 'Quantidade de registros removidos'
            }
        }
    },

    // ==========================================
    // TIMELINE
    // ==========================================
    Timeline: {
        type: 'object',
        properties: {
            servico: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    categoria: { type: 'string', example: 'Pintura' },
                    status_atual: { 
                        type: 'string', 
                        enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                        example: 'EM_ANDAMENTO'
                    },
                    data_criacao: { type: 'string', format: 'date-time', example: '2024-01-10T08:00:00.000Z' }
                }
            },
            timeline: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        tipo: {
                            type: 'string',
                            enum: ['MUDANÇA_STATUS', 'OBSERVAÇÃO'],
                            example: 'MUDANÇA_STATUS'
                        },
                        de: { type: 'string', example: 'ABERTO' },
                        para: { type: 'string', example: 'EM_ANDAMENTO' },
                        comentario: { type: 'string', example: 'Status alterado pelo proprietário' },
                        observacao: { type: 'string', example: 'Cliente aprovou o orçamento' },
                        data: { type: 'string', format: 'date-time', example: '2024-01-10T09:15:00.000Z' }
                    }
                }
            }
        }
    },

    // ==========================================
    // ADMIN - COM PAGINAÇÃO PADRÃO
    // ==========================================
    HistoricoAdminListResponse: {
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
    },

    HistoricoAdminFilters: {
        type: 'object',
        properties: {
            page: { type: 'integer', default: 1, minimum: 1 },
            limit: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
            startDate: { type: 'string', format: 'date', description: 'Data inicial (YYYY-MM-DD)' },
            endDate: { type: 'string', format: 'date', description: 'Data final (YYYY-MM-DD)' },
            status_anterior: { 
                type: 'string', 
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                description: 'Filtrar por status anterior'
            },
            status_novo: { 
                type: 'string', 
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                description: 'Filtrar por status novo'
            }
        }
    }
};