module.exports = {
    Empresa: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_usuario: { type: 'integer', example: 5 },
            descricao: { type: 'string', example: 'Empresa especializada em reformas residenciais e comerciais com mais de 10 anos de mercado.' },
            avaliacao_media: { type: 'number', format: 'float', minimum: 0, maximum: 5, example: 4.5 }
        }
    },
    EmpresaCreate: {
        type: 'object',
        properties: {
            descricao: { type: 'string', minLength: 10, maxLength: 500, example: 'Empresa especializada em reformas residenciais com mais de 10 anos de mercado.' },
            avaliacao_media: { type: 'number', minimum: 0, maximum: 5, example: 4.5 }
        }
    },
    EmpresaAvaliacao: {
        type: 'object',
        required: ['avaliacao'],
        properties: {
            avaliacao: { type: 'number', minimum: 0, maximum: 5, example: 4.5 }
        }
    },
    EmpresaResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Perfil empresarial salvo com sucesso!' },
            data: { $ref: '#/components/schemas/Empresa' }
        }
    }
};