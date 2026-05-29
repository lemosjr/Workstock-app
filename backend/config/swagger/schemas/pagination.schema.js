module.exports = {
    Pagination: {
        type: 'object',
        properties: {
            total: { type: 'integer', example: 50, description: 'Total de registros' },
            page: { type: 'integer', example: 1, description: 'Página atual' },
            limit: { type: 'integer', example: 10, description: 'Registros por página' },
            totalPages: { type: 'integer', example: 5, description: 'Total de páginas' }
        }
    }
};