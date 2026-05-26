module.exports = {
    '/services': {
        post: {
            tags: ['Solicitações de Serviço'],
            summary: 'Criar uma nova solicitação de serviço',
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
                401: { description: 'Token não fornecido ou inválido.' }
            }
        },
        get: {
            tags: ['Solicitações de Serviço'],
            summary: 'Listar ou filtrar solicitações de serviço [RF013, RF014]',
            parameters: [
                { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filtrar por categoria' },
                { name: 'tipo_imovel', in: 'query', schema: { type: 'string' }, description: 'Filtrar por tipo de imóvel' },
                { name: 'status', in: 'query', schema: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'] }, description: 'Filtrar por status' },
                { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Número da página' },
                { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 }, description: 'Itens por página' }
            ],
            responses: {
                200: {
                    description: 'Lista de solicitações retornada.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/ServiceRequest' }
                            }
                        }
                    }
                }
            }
        }
    },
    '/services/{id}': {
        get: {
            tags: ['Solicitações de Serviço'],
            summary: 'Buscar detalhes de uma solicitação por ID [RF013]',
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID numérico do serviço' }
            ],
            responses: {
                200: {
                    description: 'Detalhes retornados.',
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
            summary: 'Atualizar dados ou status de um serviço [RF017] (Apenas dono ou ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID numérico do serviço' }
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
                            schema: { $ref: '#/components/schemas/ServiceResponse' }
                        }
                    }
                },
                403: { description: 'Acesso negado (você não é o dono ou admin).' }
            }
        },
        delete: {
            tags: ['Solicitações de Serviço'],
            summary: 'Remover uma solicitação por ID (Apenas dono ou ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID numérico do serviço' }
            ],
            responses: {
                200: {
                    description: 'Removido com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Solicitação de serviço excluída com sucesso do sistema.' }
                                }
                            }
                        }
                    }
                },
                403: { description: 'Acesso negado.' }
            }
        }
    }
};