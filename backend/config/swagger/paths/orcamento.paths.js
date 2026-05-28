module.exports = {
  '/orcamentos': {
    post: {
      tags: ['Orçamentos'],
      summary: 'Cria um novo orçamento',
      description: 'Regista um novo orçamento associado a uma solicitação de serviço e a uma empresa.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrcamentoInput'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Orçamento enviado com sucesso!'
        },
        400: {
          description: 'Erro na validação dos dados enviados.'
        }
      }
    },
    get: {
      tags: ['Orçamentos'],
      summary: 'Lista todos os orçamentos',
      description: 'Retorna uma lista com todos os orçamentos registados no sistema.',
      responses: {
        200: {
          description: 'Lista de orçamentos obtida com sucesso.'
        },
        400: {
          description: 'Erro ao procurar os orçamentos.'
        }
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
          description: 'ID do orçamento a ser procurado',
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: {
          description: 'Orçamento encontrado com sucesso.'
        },
        404: {
          description: 'Orçamento não encontrado.'
        }
      }
    },
    put: {
      tags: ['Orçamentos'],
      summary: 'Atualiza um orçamento pelo ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do orçamento a ser atualizado',
          schema: { type: 'integer' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrcamentoInput'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Orçamento atualizado com sucesso!'
        },
        400: {
          description: 'Erro ao atualizar o orçamento.'
        }
      }
    },
    delete: {
      tags: ['Orçamentos'],
      summary: 'Exclui um orçamento do sistema',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do orçamento a ser removido',
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: {
          description: 'Orçamento excluído com sucesso do sistema.'
        },
        400: {
          description: 'Erro ao tentar eliminar o orçamento.'
        }
      }
    }
  },

  '/orcamentos/solicitacao/{id_solicitacao}': {
    get: {
      tags: ['Orçamentos'],
      summary: 'Lista os orçamentos de uma solicitação específica',
      parameters: [
        {
          name: 'id_solicitacao',
          in: 'path',
          required: true,
          description: 'ID da solicitação de serviço',
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: {
          description: 'Lista de orçamentos filtrada com sucesso.'
        },
        400: {
          description: 'Erro ao processar a requisição.'
        }
      }
    }
  }
};