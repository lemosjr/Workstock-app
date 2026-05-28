const userSchemas = require('./user.schema');
const serviceSchemas = require('./service.schema');
const empresaSchemas = require('./empresa.schema');
const historicoSchemas = require('./historico.schema');
const postagemSchemas = require('./postagem.schema');
const orcamentoSchema = require('./orcamento.schema');
const especialidadeSchemas = require('./especialidade.schema');
const paginationSchema = require('./pagination.schema');

const schemas = {
    ...userSchemas,
    ...serviceSchemas,
    ...empresaSchemas,
    ...historicoSchemas,
    ...postagemSchemas,
    ...orcamentoSchema,
    ...especialidadeSchemas,
    ...paginationSchema
};

module.exports = schemas;
