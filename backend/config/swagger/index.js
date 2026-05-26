const schemas = require('./schemas');
const paths = require('./paths');

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
        schemas
    },
    paths
};

module.exports = swaggerDocument;