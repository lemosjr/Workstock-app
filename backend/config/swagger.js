const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'WorkStock - Empresas API',
    version: '0.1.0',
    description: 'Documentação oficial do ecossistema backend para o WorkStock - Empresas. Contém os módulos de autenticação e o CRUD de solicitações de serviço.',
    contact: {
      name: 'Equipe de Desenvolvimento WorkStock'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor de Desenvolvimento Local'
    }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: 'd3b07384-d113-4956-a5e1-211d1e1f1a11' },
          name: { type: 'string', example: 'Lemos Reformas LTDA' },
          email: { type: 'string', example: 'lemos@workstock.com' },
          role: { type: 'string', example: 'company' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      ServiceRequest: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: 'c7a02194-c892-4112-b2e1-998d7e6f5a44' },
          clientName: { type: 'string', example: 'Ana Souza' },
          category: { type: 'string', example: 'Pintura' },
          propertyType: { type: 'string', example: 'Apartamento' },
          description: { type: 'string', example: 'Pintura completa de sala de estar de 30m² com tinta fosca.' },
          locationApprox: { type: 'string', example: 'Aldeota, Fortaleza' },
          urgencyDeadline: { type: 'string', example: 'Urgente' },
          estimatedBudget: { type: 'number', example: 1500.00 },
          status: { type: 'string', example: 'open' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Autenticação'],
        summary: 'Cadastrar uma nova conta de usuário [RF002]',
        description: 'Permite o cadastro inicial de um usuário cliente ou empresa fornecendo nome, e-mail único e senha.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Lemos Reformas' },
                  email: { type: 'string', example: 'lemos@workstock.com' },
                  password: { type: 'string', example: 'senhaSegura123' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Conta vinculada ao sistema com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Conta vinculada ao sistema com sucesso!' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          400: { description: 'Dados inválidos ou e-mail já cadastrado.' }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Autenticação'],
        summary: 'Efetuar login no sistema [RF001]',
        description: 'Inicia a sessão na aplicação validando as credenciais (e-mail e senha).',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'lemos@workstock.com' },
                  password: { type: 'string', example: 'senhaSegura123' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login efetuado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Login efetuado com sucesso!' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          401: { description: 'CNPJ (CPF) ou senha inválidos. Tente novamente.' }
        }
      }
    },
    '/services': {
      post: {
        tags: ['Solicitações de Serviço'],
        summary: 'Criar uma nova solicitação de serviço',
        description: 'Abre um novo pedido de reforma vindo do ecossistema de proprietários.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['clientName', 'category', 'propertyType', 'description', 'locationApprox', 'urgencyDeadline', 'estimatedBudget'],
                properties: {
                  clientName: { type: 'string', example: 'Ana Souza' },
                  category: { type: 'string', example: 'Pintura' },
                  propertyType: { type: 'string', example: 'Apartamento' },
                  description: { type: 'string', example: 'Pintura completa de sala de estar de 30m² com tinta fosca.' },
                  locationApprox: { type: 'string', example: 'Aldeota, Fortaleza' },
                  urgencyDeadline: { type: 'string', example: 'Urgente' },
                  estimatedBudget: { type: 'number', example: 1500.00 }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Solicitação criada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Solicitação de serviço criada com sucesso!' },
                    data: { $ref: '#/components/schemas/ServiceRequest' }
                  }
                }
              }
            }
          },
          400: { description: 'Erro de validação nos campos informados.' }
        }
      },
      get: {
        tags: ['Solicitações de Serviço'],
        summary: 'Listar ou filtrar solicitações de serviço [RF013, RF014]',
        description: 'Retorna todas as solicitações abertas ou filtra por parâmetros específicos informados na query URL.',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filtrar por categoria (ex: Pintura)' },
          { name: 'propertyType', in: 'query', schema: { type: 'string' }, description: 'Filtrar por tipo de imóvel (ex: Casa)' },
          { name: 'status', in: 'query', schema: { type: 'string' }, description: 'Filtrar por estado (open, in_progress, completed)' }
        ],
        responses: {
          200: {
            description: 'Lista de solicitações retornada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ServiceRequest' }
                }
              }
            }
          }
        }
      }
    },
    '/services/{id}': {
      get: {
        tags: ['Solicitações de Serviço'],
        summary: 'Buscar detalhes de uma solicitação por ID [RF013]',
        description: 'Retorna as informações completas de uma única oportunidade de serviço mapeada no banco.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' }, description: 'ID único da solicitação' }
        ],
        responses: {
          200: {
            description: 'Detalhes da solicitação retornados com sucesso.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ServiceRequest' }
              }
            }
          },
          404: { description: 'Solicitação de serviço não encontrada.' }
        }
      },
      put: {
        tags: ['Solicitações de Serviço'],
        summary: 'Atualizar dados ou status de um serviço [RF017]',
        description: 'Modifica informações estruturais da reforma ou altera o estado do serviço (ex: para "in_progress" ou "completed").',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' }, description: 'ID único da solicitação' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'in_progress' },
                  description: { type: 'string', example: 'Descrição técnica atualizada.' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Solicitação atualizada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Solicitação de serviço atualizada com sucesso!' },
                    data: { $ref: '#/components/schemas/ServiceRequest' }
                  }
                }
              }
            }
          },
          400: { description: 'Status inválido ou erro na requisição.' }
        }
      },
      delete: {
        tags: ['Solicitações de Serviço'],
        summary: 'Remover uma solicitação por ID',
        description: 'Exclui definitivamente uma solicitação de serviço do banco de dados.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' }, description: 'ID único da solicitação' }
        ],
        responses: {
          200: {
            description: 'Solicitação excluída com sucesso do sistema.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Solicitação de serviço excluída com sucesso do sistema.' }
                  }
                }
              }
            }
          },
          404: { description: 'Solicitação não encontrada para exclusão.' }
        }
      }
    }
  }
};

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;