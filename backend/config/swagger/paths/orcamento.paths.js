module.exports = {
    '/orcamentos': {
      post: {
        tags: ['Orçamentos'],
        summary: 'Cria um novo orçamento',
        description: 'Endpoint para uma empresa registar uma proposta de orçamento para um serviço específico.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['id_servico', 'id_empresa', 'valor_estimado', 'prazo_estimado'],
                properties: {
                  id_servico: { type: 'integer', example: 1 },
                  id_empresa: { type: 'integer', example: 2 },
                  valor_estimado: { type: 'number', example: 1200.50 },
                  prazo_estimado: { type: 'string', example: '3 dias' },
                  descricao_tecnica: { type: 'string', example: 'Manutenção preventiva inclusa' },
                  status_proposta: { type: 'string', enum: ['pendente', 'aprovado', 'rejeitado'], example: 'pendente' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Orçamento criado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Orcamento' }
              }
            }
          },
          400: { description: 'Erro na validação dos dados enviados.' }
        }
      }
    },
    '/orcamentos/{id}': {
      get: {
        tags: ['Orçamentos'],
        summary: 'Procura um orçamento pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID numérico do orçamento a procurar'
          }
        ],
        responses: {
          200: {
            description: 'Orçamento encontrado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Orcamento' }
              }
            }
          },
          404: { description: 'Orçamento não encontrado.' }
        }
      }
    }
  };