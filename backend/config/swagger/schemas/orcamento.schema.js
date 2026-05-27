module.exports = {
    Orcamento: {
      type: 'object',
      required: ['id_servico', 'id_empresa', 'valor_estimado', 'prazo_estimado'],
      properties: {
        id: {
          type: 'integer',
          description: 'ID autoincrementável do orçamento',
          example: 1
        },
        id_servico: {
          type: 'integer',
          description: 'ID do serviço associado',
          example: 2
        },
        id_empresa: {
          type: 'integer',
          description: 'ID da empresa que propôs o orçamento',
          example: 5
        },
        valor_estimado: {
          type: 'number',
          format: 'float',
          description: 'Valor estimado para a realização do serviço',
          example: 1550.00
        },
        prazo_estimado: {
          type: 'string',
          description: 'Tempo estimado de entrega do serviço',
          example: '5 dias úteis'
        },
        descricao_tecnica: {
          type: 'string',
          description: 'Detalhes e especificações técnicas da proposta',
          example: 'Instalação completa da cablagem estruturada cat6.'
        },
        status_proposta: {
          type: 'string',
          enum: ['pendente', 'aprovado', 'rejeitado'],
          description: 'Estado atual da proposta de orçamento',
          example: 'pendente'
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  };