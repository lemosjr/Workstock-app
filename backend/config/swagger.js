const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'WorkStock - Empresas API',
    version: '1.0.0',
    description: `
      Documentação oficial do ecossistema backend para o WorkStock - Empresas.
      
      ## Funcionalidades Implementadas:
      - ✅ Autenticação JWT (Login/Registro)
      - ✅ CRUD de Usuários com controle de permissões
      - ✅ CRUD de Solicitações de Serviço
      - ✅ Gestão de Perfil Empresarial (avaliações, descrição)
      - ✅ Histórico e Timeline de Serviços
      - ✅ Logs de mudanças de status automáticos
      
      ## Níveis de Acesso:
      - **PROPRIETARIO**: Pode criar e gerenciar seus próprios serviços
      - **EMPRESA**: Pode criar serviços + tem perfil empresarial estendido
      - **ADMIN**: Acesso total ao sistema
    `,
    contact: {
      name: 'Equipe de Desenvolvimento WorkStock',
      email: 'dev@workstock.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor de Desenvolvimento Local'
    },
    {
      url: 'https://workstock-api.herokuapp.com/api',
      description: 'Servidor de Produção'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT gerado no login. Exemplo: "eyJhbGciOi..."'
      }
    },
    schemas: {
      // Schemas existentes
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome_razao: { type: 'string', example: 'Lemos Reformas LTDA' },
          email: { type: 'string', example: 'lemos@workstock.com' },
          tipo_usuario: { type: 'string', enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'], example: 'EMPRESA' }
        }
      },
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
      
      // NOVOS SCHEMAS
      Empresa: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          id_usuario: { type: 'integer', example: 5 },
          descricao: { type: 'string', example: 'Empresa especializada em reformas residenciais e comerciais com mais de 10 anos de mercado.' },
          avaliacao_media: { type: 'number', format: 'float', minimum: 0, maximum: 5, example: 4.5 }
        }
      },
      Historico: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          id_service: { type: 'integer', example: 10 },
          status_anterior: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], example: 'ABERTO' },
          status_novo: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], example: 'EM_ANDAMENTO' },
          comentario: { type: 'string', example: 'Status alterado durante a execução do serviço' },
          observacao: { type: 'string', example: 'Cliente solicitou alteração na cor da pintura' },
          data_hora: { type: 'string', format: 'date-time' }
        }
      },
      Timeline: {
        type: 'object',
        properties: {
          servico: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              categoria: { type: 'string' },
              status_atual: { type: 'string' },
              data_criacao: { type: 'string', format: 'date-time' }
            }
          },
          timeline: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                tipo: { type: 'string', enum: ['MUDANÇA_STATUS', 'OBSERVAÇÃO'] },
                de: { type: 'string' },
                para: { type: 'string' },
                comentario: { type: 'string' },
                observacao: { type: 'string' },
                data: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Mensagem de erro detalhada' }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: { type: 'string' },
            example: ['O campo email é obrigatório', 'A senha deve conter no mínimo 6 caracteres']
          }
        }
      }
    }
  },
  paths: {
    // ========================================
    // ROTAS DE AUTENTICAÇÃO E USUÁRIOS
    // ========================================
    '/auth/register': {
      post: {
        tags: ['Autenticação e Usuários'],
        summary: 'Cadastrar uma nova conta de usuário [RF002]',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nome_razao', 'email', 'cpf_cnpj', 'senha', 'tipo_usuario'],
                properties: {
                  nome_razao: { type: 'string', example: 'Lemos Reformas' },
                  email: { type: 'string', example: 'lemos@workstock.com' },
                  cpf_cnpj: { type: 'string', example: '12345678000199' },
                  senha: { type: 'string', example: 'senhaSegura123' },
                  telefone: { type: 'string', example: '85999999999' },
                  foto_perfil: { type: 'string', example: 'https://foto.com/perfil.jpg' },
                  tipo_usuario: { type: 'string', enum: ['PROPRIETARIO', 'EMPRESA', 'ADMIN'], example: 'EMPRESA' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Conta criada com sucesso.',
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
          400: { description: 'Dados inválidos ou cadastros duplicados.', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Autenticação e Usuários'],
        summary: 'Efetuar login no sistema [RF001]',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                  email: { type: 'string', example: 'lemos@workstock.com' },
                  senha: { type: 'string', example: 'senhaSegura123' }
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
                    user: { $ref: '#/components/schemas/User' },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                  }
                }
              }
            }
          },
          401: { description: 'Credenciais inválidas.' }
        }
      }
    },
    '/users': {
      get: {
        tags: ['Autenticação e Usuários'],
        summary: 'Listar todos os usuários (Apenas ADMIN)',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de usuários retornada.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' }
                }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' },
          403: { description: 'Acesso negado. Apenas administradores.' }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: ['Autenticação e Usuários'],
        summary: 'Buscar usuário por ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário' }
        ],
        responses: {
          200: {
            description: 'Usuário encontrado.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          404: { description: 'Usuário não encontrado.' }
        }
      },
      put: {
        tags: ['Autenticação e Usuários'],
        summary: 'Atualizar dados do perfil [RF004] (Apenas próprio usuário ou ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome_razao: { type: 'string', example: 'Nova Razão Social' },
                  email: { type: 'string', example: 'novoemail@email.com' },
                  senha: { type: 'string', example: 'novaSenha123' },
                  telefone: { type: 'string', example: '85988888888' },
                  foto_perfil: { type: 'string', example: 'https://nova-foto.com/perfil.jpg' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Perfil atualizado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          403: { description: 'Acesso negado. Você só pode modificar sua própria conta.' }
        }
      },
      delete: {
        tags: ['Autenticação e Usuários'],
        summary: 'Excluir conta de usuário (Apenas próprio usuário ou ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário' }
        ],
        responses: {
          200: {
            description: 'Conta excluída com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Conta de usuário excluída com sucesso do sistema.' }
                  }
                }
              }
            }
          },
          403: { description: 'Acesso negado. Você só pode excluir sua própria conta.' }
        }
      }
    },

    // ========================================
    // ROTAS DE SERVIÇOS
    // ========================================
    '/services': {
      post: {
        tags: ['Solicitações de Serviço'],
        summary: 'Criar uma nova solicitação de serviço',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
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
                    message: { type: 'string', example: 'Solicitação de serviço aberta com sucesso!' },
                    data: { $ref: '#/components/schemas/ServiceRequest' }
                  }
                }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' }
        }
      },
      get: {
        tags: ['Solicitações de Serviço'],
        summary: 'Listar ou filtrar solicitações de serviço [RF013, RF014]',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filtrar por categoria' },
          { name: 'tipo_imovel', in: 'query', schema: { type: 'string' }, description: 'Filtrar por tipo de imóvel' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'] }, description: 'Filtrar por status' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Número da página' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 }, description: 'Itens por página' }
        ],
        responses: {
          200: {
            description: 'Lista de solicitações retornada.',
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
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID numérico do serviço' }
        ],
        responses: {
          200: {
            description: 'Detalhes retornados.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ServiceRequest' }
              }
            }
          },
          404: { description: 'Serviço não encontrado.' }
        }
      },
      put: {
        tags: ['Solicitações de Serviço'],
        summary: 'Atualizar dados ou status de um serviço [RF017] (Apenas dono ou ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID numérico do serviço' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status_solicitacao: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'], example: 'EM_ANDAMENTO' },
                  categoria: { type: 'string', example: 'Pintura Residencial' },
                  tipo_imovel: { type: 'string', example: 'Casa' },
                  endereco: { type: 'string', example: 'Novo endereço' },
                  prazo_urgencia: { type: 'string', example: 'Normal' },
                  faixa_preco: { type: 'string', example: 'R$ 2.000 - R$ 3.000' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Serviço atualizado com sucesso.',
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
          403: { description: 'Acesso negado (você não é o dono ou admin).' }
        }
      },
      delete: {
        tags: ['Solicitações de Serviço'],
        summary: 'Remover uma solicitação por ID (Apenas dono ou ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID numérico do serviço' }
        ],
        responses: {
          200: {
            description: 'Removido com sucesso.',
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
          403: { description: 'Acesso negado.' }
        }
      }
    },

    // ========================================
    // NOVAS ROTAS - EMPRESA
    // ========================================
    '/empresas': {
      get: {
        tags: ['Perfil Empresarial'],
        summary: 'Listar todas as empresas cadastradas',
        responses: {
          200: {
            description: 'Lista de empresas retornada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Empresa' }
                }
              }
            }
          }
        }
      }
    },
    '/empresas/meu-perfil': {
      get: {
        tags: ['Perfil Empresarial'],
        summary: 'Buscar meu próprio perfil empresarial',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Perfil empresarial encontrado.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Empresa' }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' },
          403: { description: 'Acesso negado. Apenas usuários do tipo EMPRESA.' },
          404: { description: 'Perfil empresarial não encontrado.' }
        }
      }
    },
    '/empresas/perfil': {
      post: {
        tags: ['Perfil Empresarial'],
        summary: 'Criar ou atualizar meu perfil empresarial',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  descricao: { type: 'string', minLength: 10, maxLength: 500, example: 'Empresa especializada em reformas residenciais com mais de 10 anos de mercado.' },
                  avaliacao_media: { type: 'number', minimum: 0, maximum: 5, example: 4.5 }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Perfil salvo com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Perfil empresarial salvo com sucesso!' },
                    data: { $ref: '#/components/schemas/Empresa' }
                  }
                }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' },
          403: { description: 'Acesso negado. Apenas usuários do tipo EMPRESA.' }
        }
      }
    },
    '/empresas/usuario/{usuarioId}': {
      get: {
        tags: ['Perfil Empresarial'],
        summary: 'Buscar perfil empresarial por ID do usuário',
        parameters: [
          { name: 'usuarioId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário dono da empresa' }
        ],
        responses: {
          200: {
            description: 'Perfil empresarial encontrado.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Empresa' }
              }
            }
          },
          404: { description: 'Perfil empresarial não encontrado.' }
        }
      }
    },
    '/empresas/{usuarioId}/avaliacao': {
      put: {
        tags: ['Perfil Empresarial'],
        summary: 'Atualizar avaliação média da empresa',
        parameters: [
          { name: 'usuarioId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do usuário dono da empresa' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['avaliacao'],
                properties: {
                  avaliacao: { type: 'number', minimum: 0, maximum: 5, example: 4.5 }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Avaliação atualizada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Avaliação atualizada com sucesso!' },
                    avaliacao_media: { type: 'number', example: 4.5 }
                  }
                }
              }
            }
          },
          404: { description: 'Empresa não encontrada.' }
        }
      }
    },

    // ========================================
    // NOVAS ROTAS - HISTÓRICO
    // ========================================
    '/services/{id}/historico': {
      get: {
        tags: ['Histórico de Serviços'],
        summary: 'Buscar histórico completo de um serviço',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do serviço' }
        ],
        responses: {
          200: {
            description: 'Histórico retornado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    service_id: { type: 'integer' },
                    total_registros: { type: 'integer' },
                    historico: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Historico' }
                    }
                  }
                }
              }
            }
          },
          404: { description: 'Serviço não encontrado.' }
        }
      }
    },
    '/services/{id}/timeline': {
      get: {
        tags: ['Histórico de Serviços'],
        summary: 'Buscar timeline completa de um serviço (inclui mudanças de status e observações)',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do serviço' }
        ],
        responses: {
          200: {
            description: 'Timeline retornada com sucesso.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Timeline' }
              }
            }
          },
          404: { description: 'Serviço não encontrado.' }
        }
      }
    },
    '/services/{id}/historico/observacao': {
      post: {
        tags: ['Histórico de Serviços'],
        summary: 'Adicionar observação manual ao histórico (Apenas dono do serviço ou ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do serviço' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  comentario: { type: 'string', maxLength: 255, example: 'Cliente solicitou alteração no prazo' },
                  observacao: { type: 'string', maxLength: 1000, example: 'Detalhamento adicional sobre a solicitação do cliente...' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Observação adicionada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Observação adicionada ao histórico com sucesso!' },
                    data: { $ref: '#/components/schemas/Historico' }
                  }
                }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' },
          403: { description: 'Acesso negado. Você não tem permissão.' },
          404: { description: 'Serviço não encontrado.' }
        }
      }
    },
    '/admin/historico': {
      get: {
        tags: ['Administração'],
        summary: 'Listar todo o histórico do sistema (Apenas ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Número da página' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 }, description: 'Itens por página' },
          { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Data inicial (YYYY-MM-DD)' },
          { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' }, description: 'Data final (YYYY-MM-DD)' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'] }, description: 'Filtrar por status' }
        ],
        responses: {
          200: {
            description: 'Histórico do sistema retornado.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total_registros: { type: 'integer' },
                    historico: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Historico' }
                    }
                  }
                }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' },
          403: { description: 'Acesso negado. Apenas administradores.' }
        }
      }
    },
    '/admin/historico/{historicoId}': {
      delete: {
        tags: ['Administração'],
        summary: 'Deletar um registro histórico específico (Apenas ADMIN)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'historicoId', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do registro histórico' }
        ],
        responses: {
          200: {
            description: 'Registro deletado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Registro histórico deletado com sucesso!' }
                  }
                }
              }
            }
          },
          401: { description: 'Token não fornecido ou inválido.' },
          403: { description: 'Acesso negado. Apenas administradores.' },
          404: { description: 'Registro histórico não encontrado.' }
        }
      }
    }
  }
};

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'WorkStock API - Documentação',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true
    }
  }));
};

module.exports = setupSwagger;