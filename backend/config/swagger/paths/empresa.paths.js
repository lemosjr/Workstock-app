module.exports = {
    '/empresas': {
        get: {
            tags: ['Perfil Empresarial'],
            summary: 'Listar todas as empresas cadastradas',
            description: 'Retorna uma lista paginada de empresas com suporte a filtros.',
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
                    name: 'avaliacao_min',
                    in: 'query',
                    schema: { type: 'number', minimum: 0, maximum: 5 },
                    description: 'Filtrar por avaliação média mínima'
                },
                {
                    name: 'descricao',
                    in: 'query',
                    schema: { type: 'string' },
                    description: 'Filtrar por descrição (busca parcial)'
                }
            ],
            responses: {
                200: {
                    description: 'Lista de empresas retornada com paginação.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/EmpresaListResponse' }
                        }
                    }
                },
                400: { description: 'Parâmetros inválidos.' }
            }
        }
    },
    '/empresas/meu-perfil': {
        get: {
            tags: ['Perfil Empresarial'],
            summary: 'Buscar meu próprio perfil empresarial',
            description: 'Retorna o perfil empresarial do usuário autenticado. Apenas usuários do tipo EMPRESA podem acessar.',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Perfil empresarial encontrado.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Empresa' }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas usuários do tipo EMPRESA.' },
                404: { description: 'Perfil empresarial não encontrado.' }
            }
        }
    },
    '/empresas/perfil': {
        post: {
            tags: ['Perfil Empresarial'],
            summary: 'Criar ou atualizar meu perfil empresarial',
            description: 'Cria um novo perfil empresarial ou atualiza o existente. Apenas usuários do tipo EMPRESA podem acessar.',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/EmpresaCreate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Perfil salvo com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/EmpresaResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas usuários do tipo EMPRESA.' }
            }
        }
    },
    '/empresas/usuario/{usuarioId}': {
        get: {
            tags: ['Perfil Empresarial'],
            summary: 'Buscar perfil empresarial por ID do usuário',
            description: 'Retorna o perfil empresarial de um usuário específico pelo seu ID. Acesso público.',
            parameters: [
                { 
                    name: 'usuarioId', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID do usuário dono da empresa' 
                }
            ],
            responses: {
                200: {
                    description: 'Perfil empresarial encontrado.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Empresa' }
                        }
                    }
                },
                400: { description: 'ID do usuário inválido.' },
                404: { description: 'Perfil empresarial não encontrado.' }
            }
        }
    },
    '/empresas/{usuarioId}/avaliacao': {
        put: {
            tags: ['Perfil Empresarial'],
            summary: 'Atualizar avaliação média da empresa',
            description: 'Atualiza a avaliação média de uma empresa. Acesso público para clientes avaliarem serviços.',
            parameters: [
                { 
                    name: 'usuarioId', 
                    in: 'path', 
                    required: true, 
                    schema: { type: 'integer' }, 
                    description: 'ID do usuário dono da empresa' 
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/EmpresaAvaliacao' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Avaliação atualizada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/EmpresaAvaliacaoResponse' }
                        }
                    }
                },
                400: { description: 'Avaliação inválida (deve ser entre 0 e 5).' },
                404: { description: 'Empresa não encontrada.' }
            }
        }
    }
};