const authPaths = require('./auth.paths');
const userPaths = require('./user.paths');
const servicePaths = require('./service.paths');
const empresaPaths = require('./empresa.paths');
const historicoPaths = require('./historico.paths');
const avaliacaoPaths = require('./avaliacao.paths');
 
const postagemPaths = require('./postagem.paths');
const orcamentoPaths = require('./orcamento.paths');
const especialidadePaths = require('./especialidade.paths');
const empresaEspecialidadePaths = require('./empresa-especialidade.paths');

const paths = {
    ...authPaths,
    ...userPaths,
    ...servicePaths,
    ...empresaPaths,
    ...historicoPaths,
    ...postagemPaths,
    ...orcamentoPaths,
    ...especialidadePaths,
    ...empresaEspecialidadePaths,
    ...avaliacaoPaths
};
 
module.exports = paths;
