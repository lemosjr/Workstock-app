const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'WorkStock - Empresas API',
    version: '0.1.0',
    description: 'Documentação oficial do ecossistema backend para o WorkStock - Empresas.',
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
  paths: {
    '/auth/register': {
      post: {
        summary: 'Cadastrar uma nova conta de usuário [cite: 99]',
        description: 'Permite o cadastro inicial fornecendo nome, e-mail único e senha.',
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
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Dados inválidos ou e-mail já cadastrado.'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Efetuar login no sistema [cite: 77]',
        description: 'Autentica o usuário baseado nas credenciais armazenadas.',
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
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          },
          401: {
            description: 'Credenciais inválidas (Inconsistência de dados).'
          }
        }
      }
    }
  }
};

// Middleware para expor a interface gráfica do Swagger
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;