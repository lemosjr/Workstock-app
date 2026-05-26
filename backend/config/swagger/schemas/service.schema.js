module.exports = {
    ServiceRequest: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            id_usuario: { type: 'integer', example: 1 },
            categoria: { type: 'string', example: 'Pintura' },
            tipo_imovel: { type: 'string', example: 'Apartamento' },
            endereco: { type: 'string', example: 'Aldeota, Fortaleza' },
            coordenadas: { type: 'string', example: '-3.7327,-38.5031' },
            prazo_urgencia: { type: 'string', example: 'Até 15 dias' },
            faixa_preco: { type: 'string', example: 'R$ 1.500 - R$ 2.500' },
            status_solicitacao: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], example: 'ABERTO' },
            foto: { type: 'string', example: 'https://link_da_imagem.jpg' },
            data_criacao: { type: 'string', format: 'date-time' }
        }
    },
    ServiceCreate: {
        type: 'object',
        required: ['categoria', 'tipo_imovel', 'endereco', 'prazo_urgencia', 'faixa_preco'],
        properties: {
            categoria: { type: 'string', example: 'Pintura' },
            tipo_imovel: { type: 'string', example: 'Apartamento' },
            endereco: { type: 'string', example: 'Aldeota, Fortaleza' },
            coordenadas: { type: 'string', example: '-3.7327,-38.5031' },
            prazo_urgencia: { type: 'string', example: 'Urgente' },
            faixa_preco: { type: 'string', example: 'R$ 1.000 - R$ 2.000' },
            foto: { type: 'string', example: 'https://foto-servico.com/imagem.jpg' }
        }
    },
    ServiceUpdate: {
        type: 'object',
        properties: {
            categoria: { type: 'string', example: 'Pintura Residencial' },
            tipo_imovel: { type: 'string', example: 'Casa' },
            endereco: { type: 'string', example: 'Novo endereço' },
            prazo_urgencia: { type: 'string', example: 'Normal' },
            faixa_preco: { type: 'string', example: 'R$ 2.000 - R$ 3.000' },
            status_solicitacao: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], example: 'EM_ANDAMENTO' }
        }
    },
    ServiceResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Solicitação de serviço aberta com sucesso!' },
            data: { $ref: '#/components/schemas/ServiceRequest' }
        }
    }
};