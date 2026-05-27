const userSchemas = require('./user.schema');
const serviceSchemas = require('./service.schema');
const empresaSchemas = require('./empresa.schema');
const historicoSchemas = require('./historico.schema');
const orcamentoSchema = require('./orcamento.schema');

const schemas = {
    ...userSchemas,
    ...serviceSchemas,
    ...empresaSchemas,
    ...historicoSchemas,
    ...orcamentoSchema,
};

module.exports = schemas;