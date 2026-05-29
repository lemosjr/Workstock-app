module.exports = {
    '/avaliacoes': {
        post: {
            tags: ['Avaliações'],
            summary: 'Registrar uma nova avaliação de serviço [RF011]',
            description: 'Cria uma avaliação para um serviço concluído. O serviço deve estar com status CONCLUIDO.',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/AvaliacaoCreate' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Avaliação registrada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AvaliacaoResponse' }
                        }
                    }
                },
                400: { description: 'Campos inválidos, nota fora do intervalo ou serviço ainda não finalizado.' },
                401: { description: 'Token não fornecido ou inválido.' }
            }
        },
        get: {
            tags: ['Avaliações'],
            summary: 'Listar todas as avaliações',
            responses: {
                200: {
                    description: 'Lista de avaliações retornada com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Avaliacao' }
                            }
                        }
                    }
                }
            }
        }
    },
    '/avaliacoes/{id}': {
        get: {
            tags: ['Avaliações'],
            summary: 'Buscar avaliação por ID',
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da avaliação' }
            ],
            responses: {
                200: {
                    description: 'Avaliação encontrada.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Avaliacao' }
                        }
                    }
                },
                404: { description: 'Avaliação não encontrada.' }
            }
        },
        put: {
            tags: ['Avaliações'],
            summary: 'Atualizar uma avaliação existente [RF011]',
            description: 'Permite editar nota e/ou comentário de uma avaliação já registrada.',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da avaliação' }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/AvaliacaoUpdate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Avaliação atualizada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AvaliacaoResponse' }
                        }
                    }
                },
                400: { description: 'Nota inválida ou dados mal formatados.' },
                401: { description: 'Token não fornecido ou inválido.' },
                404: { description: 'Avaliação não encontrada.' }
            }
        },
        delete: {
            tags: ['Avaliações'],
            summary: 'Excluir uma avaliação (Apenas ADMIN)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da avaliação' }
            ],
            responses: {
                200: {
                    description: 'Avaliação excluída com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Avaliação excluída com sucesso do sistema.' }
                                }
                            }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas administradores podem excluir avaliações.' },
                404: { description: 'Avaliação não encontrada.' }
            }
        }
    }
};
