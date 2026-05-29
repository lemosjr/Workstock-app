module.exports = {
    // ==========================================
    // SCHEMA PRINCIPAL
    // ==========================================
    Empresa: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_usuario: { type: 'integer', example: 5 },
            descricao: { type: 'string', example: 'Empresa especializada em reformas residenciais e comerciais com mais de 10 anos de mercado.' },
            avaliacao_media: { type: 'number', format: 'float', minimum: 0, maximum: 5, example: 4.5 },
            usuario: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 5 },
                    nome_razao: { type: 'string', example: 'Tech Reformas LTDA' },
                    email: { type: 'string', example: 'contato@techreformas.com' },
                    telefone: { type: 'string', example: '85988888888' },
                    foto_perfil: { type: 'string', example: 'https://.../logo.jpg' }
                }
            }
        }
    },

    // ==========================================
    // CRIAÇÃO / ATUALIZAÇÃO
    // ==========================================
    EmpresaCreate: {
        type: 'object',
        properties: {
            descricao: { 
                type: 'string', 
                minLength: 10, 
                maxLength: 500, 
                example: 'Empresa especializada em reformas residenciais com mais de 10 anos de mercado.' 
            },
            avaliacao_media: { 
                type: 'number', 
                minimum: 0, 
                maximum: 5, 
                example: 4.5 
            }
        }
    },

    // ==========================================
    // AVALIAÇÃO
    // ==========================================
    EmpresaAvaliacao: {
        type: 'object',
        required: ['avaliacao'],
        properties: {
            avaliacao: { 
                type: 'number', 
                minimum: 0, 
                maximum: 5, 
                example: 4.5 
            }
        }
    },

    // ==========================================
    // RESPOSTAS
    // ==========================================
    EmpresaResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Perfil empresarial salvo com sucesso!' },
            data: { $ref: '#/components/schemas/Empresa' }
        }
    },

    EmpresaAvaliacaoResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Avaliação atualizada com sucesso!' },
            avaliacao_media: { type: 'number', example: 4.5 }
        }
    },

    // ==========================================
    // LISTAGEM COM PAGINAÇÃO
    // ==========================================
    EmpresaListResponse: {
        type: 'object',
        properties: {
            empresas: {
                type: 'array',
                items: { $ref: '#/components/schemas/Empresa' }
            },
            pagination: {
                $ref: '#/components/schemas/Pagination'
            }
        }
    },

    // ==========================================
    // FILTROS
    // ==========================================
    EmpresaFilters: {
        type: 'object',
        properties: {
            page: { type: 'integer', default: 1, minimum: 1 },
            limit: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
            avaliacao_min: { type: 'number', minimum: 0, maximum: 5, description: 'Filtrar por avaliação mínima' },
            descricao: { type: 'string', description: 'Filtrar por descrição (busca parcial)' }
        }
    }
};