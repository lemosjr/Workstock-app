const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/index');

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