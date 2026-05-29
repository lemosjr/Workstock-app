module.exports = {
    '/services': {
        post: {
            tags: ['Solicitações de Serviço'],
            summary: 'Criar uma nova solicitação de serviço',
            description: 'Cria uma nova solicitação de serviço. Requer autenticação.',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ServiceCreate' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Solicitação criada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ServiceResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos ou campos obrigatórios não preenchidos.' },
                401: { description: 'Token não fornecido ou inválido.' }
            }
        },
        get: {
            tags: ['Solicitações de Serviço'],
            summary: 'Listar ou filtrar solicitações de serviço [RF013, RF014]',
            description: 'Retorna uma lista paginada de solicitações de serviço com suporte a filtros.',
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
                    name: 'category',
                    in: 'query',
                    schema: { type: 'string' },
                    description: 'Filtrar por categoria (busca parcial)'
                },
                {
                    name: 'tipo_imovel',
                    in: 'query',
                    schema: { type: 'string' },
                    description: 'Filtrar por tipo de imóvel (busca parcial)'
                },
                {
                    name: 'status',
                    in: 'query',
                    schema: { 
                        type: 'string', 
                        enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'] 
                    },
                    description: 'Filtrar por status da solicitação'
                }
            ],
            responses: {
                200: {
                    description: 'Lista de solicitações retornada com paginação.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ServiceListResponse' }
                        }
                    }
                },
                400: { description: 'Parâmetros inválidos.' }
            }
        }
    },
    '/services/{id}': {
        get: {
            tags: ['Solicitações de Serviço'],
            summary: 'Buscar detalhes de uma solicitação por ID [RF013]',
            description: 'Retorna os detalhes completos de uma solicitação de serviço específica.',
            parameters: [
                { 
                    name: 'id', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID numérico do serviço' 
                }
            ],
            responses: {
                200: {
                    description: 'Detalhes retornados com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ServiceRequest' }
                        }
                    }
                },
                404: { description: 'Serviço não encontrado.' }
            }
        },
        put: {
            tags: ['Solicitações de Serviço'],
            summary: 'Atualizar dados ou status de um serviço [RF017]',
            description: 'Atualiza os dados ou o status de um serviço. Apenas o dono do serviço ou ADMIN podem executar esta ação.',
            security: [{ BearerAuth: [] }],
            parameters: [
                { 
                    name: 'id', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID numérico do serviço' 
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ServiceUpdate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Serviço atualizado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ServiceUpdateResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos ou status inválido.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado (você não é o dono ou admin).' },
                404: { description: 'Serviço não encontrado.' }
            }
        },
        delete: {
            tags: ['Solicitações de Serviço'],
            summary: 'Remover uma solicitação por ID',
            description: 'Remove permanentemente uma solicitação de serviço. Apenas o dono do serviço ou ADMIN podem executar esta ação.',
            security: [{ BearerAuth: [] }],
            parameters: [
                { 
                    name: 'id', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID numérico do serviço' 
                }
            ],
            responses: {
                200: {
                    description: 'Removido com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ServiceDeleteResponse' }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas o dono ou ADMIN podem remover.' },
                404: { description: 'Serviço não encontrado.' }
            }
        }
    }
};