module.exports = {
    '/empresas': {
        get: {
            tags: ['Perfil Empresarial'],
            summary: 'Listar todas as empresas cadastradas',
            responses: {
                200: {
                    description: 'Lista de empresas retornada com sucesso.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Empresa' }
                            }
                        }
                    }
                }
            }
        }
    },
    '/empresas/meu-perfil': {
        get: {
            tags: ['Perfil Empresarial'],
            summary: 'Buscar meu próprio perfil empresarial',
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
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas usuários do tipo EMPRESA.' }
            }
        }
    },
    '/empresas/usuario/{usuarioId}': {
        get: {
            tags: ['Perfil Empresarial'],
            summary: 'Buscar perfil empresarial por ID do usuário',
            parameters: [
                { name: 'usuarioId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário dono da empresa' }
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
                404: { description: 'Perfil empresarial não encontrado.' }
            }
        }
    },
    '/empresas/{usuarioId}/avaliacao': {
        put: {
            tags: ['Perfil Empresarial'],
            summary: 'Atualizar avaliação média da empresa',
            parameters: [
                { name: 'usuarioId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário dono da empresa' }
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
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Avaliação atualizada com sucesso!' },
                                    avaliacao_media: { type: 'number', example: 4.5 }
                                }
                            }
                        }
                    }
                },
                404: { description: 'Empresa não encontrada.' }
            }
        }
    }
};