module.exports = {
    // Schema principal do histórico
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

    // Schema para criação de observação
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
        },
        required: []
    },

    // Schema para atualização de observação
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
        },
        required: []
    },

    // Schema para resposta de lista de histórico
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
                items: { 
                    $ref: '#/components/schemas/Historico' 
                },
                description: 'Lista de registros históricos'
            }
        }
    },

    // Schema para resposta de registro único
    HistoricoSingleResponse: {
        type: 'object',
        properties: {
            message: { 
                type: 'string', 
                example: 'Registro histórico encontrado com sucesso!' 
            },
            data: { 
                $ref: '#/components/schemas/Historico' 
            }
        }
    },

    // Schema para resposta de criação/atualização
    HistoricoMutationResponse: {
        type: 'object',
        properties: {
            message: { 
                type: 'string', 
                example: 'Observação adicionada ao histórico com sucesso!' 
            },
            data: { 
                $ref: '#/components/schemas/Historico' 
            }
        }
    },

    // Schema para resposta de deleção
    HistoricoDeleteResponse: {
        type: 'object',
        properties: {
            message: { 
                type: 'string', 
                example: 'Registro histórico removido com sucesso!' 
            }
        }
    },

    // Schema para deleção em massa
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

    // Schema de timeline
    Timeline: {
        type: 'object',
        properties: {
            servico: {
                type: 'object',
                properties: {
                    id: { 
                        type: 'integer', 
                        example: 1,
                        description: 'ID do serviço'
                    },
                    categoria: { 
                        type: 'string', 
                        example: 'Pintura',
                        description: 'Categoria do serviço'
                    },
                    status_atual: { 
                        type: 'string', 
                        enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                        example: 'EM_ANDAMENTO',
                        description: 'Status atual do serviço'
                    },
                    data_criacao: { 
                        type: 'string', 
                        format: 'date-time', 
                        example: '2024-01-10T08:00:00.000Z',
                        description: 'Data de criação do serviço'
                    }
                }
            },
            timeline: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                            description: 'ID do registro histórico'
                        },
                        tipo: {
                            type: 'string',
                            enum: ['MUDANÇA_STATUS', 'OBSERVAÇÃO'],
                            example: 'MUDANÇA_STATUS',
                            description: 'Tipo do evento no histórico'
                        },
                        de: { 
                            type: 'string', 
                            example: 'ABERTO',
                            description: 'Status anterior (quando aplicável)'
                        },
                        para: { 
                            type: 'string', 
                            example: 'EM_ANDAMENTO',
                            description: 'Status novo (quando aplicável)'
                        },
                        comentario: { 
                            type: 'string', 
                            example: 'Status alterado pelo proprietário',
                            description: 'Comentário sobre o evento'
                        },
                        observacao: { 
                            type: 'string', 
                            example: 'Cliente aprovou o orçamento',
                            description: 'Observação detalhada'
                        },
                        data: { 
                            type: 'string', 
                            format: 'date-time', 
                            example: '2024-01-10T09:15:00.000Z',
                            description: 'Data do evento'
                        }
                    }
                },
                description: 'Lista cronológica de eventos do serviço'
            }
        }
    },

    // Schema para filtros de listagem administrativa
    HistoricoAdminFilters: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                minimum: 1,
                default: 1,
                example: 1,
                description: 'Número da página para paginação'
            },
            limit: {
                type: 'integer',
                minimum: 1,
                maximum: 100,
                default: 20,
                example: 20,
                description: 'Quantidade de registros por página'
            },
            startDate: {
                type: 'string',
                format: 'date',
                example: '2024-01-01',
                description: 'Data inicial para filtro (YYYY-MM-DD)'
            },
            endDate: {
                type: 'string',
                format: 'date',
                example: '2024-12-31',
                description: 'Data final para filtro (YYYY-MM-DD)'
            },
            status_anterior: {
                type: 'string',
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                example: 'ABERTO',
                description: 'Filtrar por status anterior'
            },
            status_novo: {
                type: 'string',
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                example: 'EM_ANDAMENTO',
                description: 'Filtrar por status novo'
            }
        }
    },

    // Schema para resposta administrativa com paginação
    HistoricoAdminListResponse: {
        type: 'object',
        properties: {
            total_registros: {
                type: 'integer',
                example: 150,
                description: 'Total de registros encontrados'
            },
            page: {
                type: 'integer',
                example: 1,
                description: 'Página atual'
            },
            limit: {
                type: 'integer',
                example: 20,
                description: 'Registros por página'
            },
            historico: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Historico'
                },
                description: 'Lista de registros históricos'
            }
        }
    }
};