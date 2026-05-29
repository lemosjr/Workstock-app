module.exports = {
    Avaliacao: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_service: { type: 'integer', example: 10 },
            id_empresa: { type: 'integer', example: 3 },
            nota: { type: 'integer', minimum: 1, maximum: 5, example: 4 },
            comentario: { type: 'string', maxLength: 300, example: 'Ótimo serviço, muito profissional e pontual.' }
        }
    },
    AvaliacaoCreate: {
        type: 'object',
        required: ['id_service', 'id_empresa', 'nota'],
        properties: {
            id_service: { type: 'integer', example: 10 },
            id_empresa: { type: 'integer', example: 3 },
            nota: { type: 'integer', minimum: 1, maximum: 5, example: 4 },
            comentario: { type: 'string', maxLength: 300, example: 'Serviço executado com excelência.' }
        }
    },
    AvaliacaoUpdate: {
        type: 'object',
        properties: {
            nota: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
            comentario: { type: 'string', maxLength: 300, example: 'Revisando minha avaliação: superou as expectativas!' }
        }
    },
    AvaliacaoResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Avaliação registrada com sucesso!' },
            data: { $ref: '#/components/schemas/Avaliacao' }
        }
    }
};
