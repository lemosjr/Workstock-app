module.exports = {
    '/empresas/{empresaId}/especialidades': {
        get: {
            tags: ['Empresa Especialidades'],
            summary: 'Listar especialidades de uma empresa',
            parameters: [
                { name: 'empresaId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da empresa' }
            ],
            responses: {
                200: {
                    description: 'Lista de especialidades da empresa retornada com sucesso.',
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
            summary: 'Vincular especialidade à empresa',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'empresaId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da empresa' }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/EmpresaEspecialidadeVincular' }
                    }
                }
            },
            responses: {
                201: { description: 'Especialidade vinculada com sucesso.' },
                400: { description: 'Dados inválidos ou especialidade já vinculada.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas EMPRESA.' },
                404: { description: 'Empresa ou especialidade não encontrada.' }
            }
        }
    },
    '/empresas/{empresaId}/especialidades/{especialidadeId}': {
        delete: {
            tags: ['Empresa Especialidades'],
            summary: 'Desvincular especialidade da empresa',
            security: [{ BearerAuth: [] }],
            parameters: [
                { name: 'empresaId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da empresa' },
                { name: 'especialidadeId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da especialidade' }
            ],
            responses: {
                200: { description: 'Especialidade desvinculada com sucesso.' },
                401: { description: 'Token não fornecido ou inválido.' },
                403: { description: 'Acesso negado. Apenas EMPRESA.' },
                404: { description: 'Empresa ou vínculo não encontrado.' }
            }
        }
    }
};
