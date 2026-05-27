module.exports = {
    Especialidade: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Elétrica' }
        }
    },
    EspecialidadeCreate: {
        type: 'object',
        required: ['nome'],
        properties: {
            nome: { type: 'string', minLength: 3, maxLength: 100, example: 'Hidráulica' }
        }
    },
    EspecialidadeResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Especialidade criada com sucesso!' },
            data: { $ref: '#/components/schemas/Especialidade' }
        }
    },
    EmpresaEspecialidadeVincular: {
        type: 'object',
        required: ['id_especialidade'],
        properties: {
            id_especialidade: { type: 'integer', example: 2 }
        }
    }
};
