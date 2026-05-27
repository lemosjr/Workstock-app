const postagemSchemas = {
    Postagem: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_usuario: { type: 'integer', example: 10 },
            descricao: { type: 'string', example: 'Texto da postagem' },
            data_hora: { type: 'string', format: 'date-time' },
            fotos: {
                type: 'array',
                items: { type: 'string' },
                example: ['https://exemplo.com/foto1.jpg']
            }
        }
    },
    PostagemInput: {
        type: 'object',
        properties: {
            //id_usuario: { type: 'integer', example: 10 },
            descricao: { type: 'string', example: 'Nova postagem' },
            fotos: {
                type: 'array',
                items: { type: 'string' },
                example: ['https://exemplo.com/foto1.jpg']
            }
        }
    }
};

module.exports = postagemSchemas;
