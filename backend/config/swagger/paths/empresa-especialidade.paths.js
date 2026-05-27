module.exports = {
    '/empresas/{empresaId}/especialidades': {
        get: {
            tags: ['Empresa Especialidades'],
            summary: 'Listar especialidades vinculadas a uma empresa',
            parameters: [
                { name: 'empresaId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da empresa' }
            ],
            responses: {
                200: {
                    description: 'Lista de especialidades da empresa.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Especialidade' }
                            }
                        }
                    }
                },
                404: { description: 'Empresa não encontrada.' }
            }
        },
        post: {
            tags: ['Empresa Especialidades'],
            summary: 'Vincular especialidade a uma empresa (apenas EMPRESA)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'empresaId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da empresa' }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['id_especialidade'],
                            properties: {
                                id_especialidade: { type: 'integer', example: 1 }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Especialidade vinculada com sucesso.' },
                400: { description: 'Dados inválidos ou vínculo já existente.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas EMPRESA.' }
            }
        }
    },
    '/empresas/{empresaId}/especialidades/{especialidadeId}': {
        delete: {
            tags: ['Empresa Especialidades'],
            summary: 'Desvincular especialidade de uma empresa (apenas EMPRESA)',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'empresaId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da empresa' },
                { name: 'especialidadeId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da especialidade' }
            ],
            responses: {
                200: { description: 'Especialidade desvinculada com sucesso.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas EMPRESA.' },
                404: { description: 'Vínculo não encontrado.' }
            }
        }
    }
};
