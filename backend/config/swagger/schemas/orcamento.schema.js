module.exports = {
  OrcamentoInput: {
    type: 'object',
    required: ['id_solicitacao', 'id_empresa', 'valor_mao_obra', 'prazo_execucao', 'descricao'],
    properties: {
      id_solicitacao: {
        type: 'integer',
        description: 'ID da solicitação de serviço vinculada',
        example: 1
      },
      id_empresa: {
        type: 'integer',
        description: 'ID da empresa que está enviando o orçamento',
        example: 1
      },
      valor_mao_obra: {
        type: 'number',
        format: 'float',
        description: 'Valor cobrado pelo serviço/mão de obra',
        example: 800.00
      },
      valor_material: {
        type: 'number',
        format: 'float',
        description: 'Valor dos materiais (opcional)',
        example: 400.50
      },
      prazo_execucao: {
        type: 'string',
        description: 'Prazo estimado para a conclusão',
        example: '3 dias'
      },
      descricao: {
        type: 'string',
        description: 'Detalhamento técnico da proposta',
        example: 'Pintura completa inclusa aplicação de massa corrida e tinta acrílica.'
      },
      status_orcamento: {
        type: 'string',
        enum: ['pending', 'accepted', 'rejected'],
        description: 'Status atual da proposta de orçamento',
        example: 'pending'
      }
    }
  }
};