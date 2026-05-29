module.exports = {
    // ==========================================
    // SCHEMA PRINCIPAL
    // ==========================================
    ServiceRequest: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_usuario: { type: 'integer', example: 1 },
            categoria: { type: 'string', example: 'Pintura' },
            tipo_imovel: { type: 'string', example: 'Apartamento' },
            endereco: { type: 'string', example: 'Aldeota, Fortaleza' },
            coordenadas: { type: 'string', example: '-3.7327,-38.5031' },
            prazo_urgencia: { type: 'string', example: 'Até 15 dias' },
            faixa_preco: { type: 'string', example: 'R$ 1.500 - R$ 2.500' },
            status_solicitacao: { 
                type: 'string', 
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], 
                example: 'ABERTO' 
            },
            foto: { type: 'string', example: 'https://link_da_imagem.jpg' },
            data_criacao: { type: 'string', format: 'date-time' },
            cliente: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome_razao: { type: 'string', example: 'João Silva' },
                    email: { type: 'string', example: 'joao@email.com' },
                    telefone: { type: 'string', example: '85999999999' }
                }
            }
        }
    },

    // ==========================================
    // CRIAÇÃO
    // ==========================================
    ServiceCreate: {
        type: 'object',
        required: ['categoria', 'tipo_imovel', 'endereco', 'prazo_urgencia', 'faixa_preco'],
        properties: {
            categoria: { type: 'string', example: 'Pintura' },
            tipo_imovel: { type: 'string', example: 'Apartamento' },
            endereco: { type: 'string', example: 'Aldeota, Fortaleza' },
            coordenadas: { type: 'string', example: '-3.7327,-38.5031' },
            prazo_urgencia: { type: 'string', example: 'Urgente' },
            faixa_preco: { type: 'string', example: 'R$ 1.000 - R$ 2.000' },
            foto: { type: 'string', example: 'https://foto-servico.com/imagem.jpg' }
        }
    },

    // ==========================================
    // ATUALIZAÇÃO
    // ==========================================
    ServiceUpdate: {
        type: 'object',
        properties: {
            categoria: { type: 'string', example: 'Pintura Residencial' },
            tipo_imovel: { type: 'string', example: 'Casa' },
            endereco: { type: 'string', example: 'Novo endereço' },
            prazo_urgencia: { type: 'string', example: 'Normal' },
            faixa_preco: { type: 'string', example: 'R$ 2.000 - R$ 3.000' },
            status_solicitacao: { 
                type: 'string', 
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], 
                example: 'EM_ANDAMENTO' 
            }
        }
    },

    // ==========================================
    // RESPOSTAS
    // ==========================================
    ServiceResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Solicitação de serviço aberta com sucesso!' },
            data: { $ref: '#/components/schemas/ServiceRequest' }
        }
    },

    ServiceUpdateResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Solicitação de serviço atualizada com sucesso!' },
            data: { $ref: '#/components/schemas/ServiceRequest' }
        }
    },

    ServiceDeleteResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Solicitação de serviço excluída com sucesso do sistema.' }
        }
    },

    // ==========================================
    // LISTAGEM COM PAGINAÇÃO
    // ==========================================
    ServiceListResponse: {
        type: 'object',
        properties: {
            services: {
                type: 'array',
                items: { $ref: '#/components/schemas/ServiceRequest' }
            },
            pagination: {
                $ref: '#/components/schemas/Pagination'
            }
        }
    },

    // ==========================================
    // FILTROS
    // ==========================================
    ServiceFilters: {
        type: 'object',
        properties: {
            page: { type: 'integer', default: 1, minimum: 1 },
            limit: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
            category: { type: 'string', description: 'Filtrar por categoria' },
            tipo_imovel: { type: 'string', description: 'Filtrar por tipo de imóvel' },
            status: { 
                type: 'string', 
                enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
                description: 'Filtrar por status'
            }
        }
    }
};