const authPaths = require('./auth.paths');
const userPaths = require('./user.paths');
const servicePaths = require('./service.paths');
const empresaPaths = require('./empresa.paths');
const historicoPaths = require('./historico.paths');
const especialidadePaths = require('./especialidade.paths');
const empresaEspecialidadePaths = require('./empresa-especialidade.paths');

const paths = {
    ...authPaths,
    ...userPaths,
    ...servicePaths,
    ...empresaPaths,
    ...historicoPaths,
    ...especialidadePaths,
    ...empresaEspecialidadePaths
};

module.exports = paths;