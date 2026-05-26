const userSchemas = require('./user.schema');
const serviceSchemas = require('./service.schema');
const empresaSchemas = require('./empresa.schema');
const historicoSchemas = require('./historico.schema');

const schemas = {
    ...userSchemas,
    ...serviceSchemas,
    ...empresaSchemas,
    ...historicoSchemas
};

module.exports = schemas;