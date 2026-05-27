const userSchemas = require('./user.schema');
const serviceSchemas = require('./service.schema');
const empresaSchemas = require('./empresa.schema');
const historicoSchemas = require('./historico.schema');
const paginationSchema = require('./pagination.schema');

const schemas = {
    ...userSchemas,
    ...serviceSchemas,
    ...empresaSchemas,
    ...historicoSchemas,
    ...paginationSchema
};

module.exports = schemas;