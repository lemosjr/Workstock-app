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
            nome: { type: 'string', minLength: 3, maxLength: 100, example: 'Elétrica' }
        }
    }
};
