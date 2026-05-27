const Joi = require('joi');

/**
 * Validação de Postagem
 * Realiza validações de entrada para operações com postagens.
 * Utiliza a biblioteca Joi para definir schemas de validação.
 */
class PostagemValidation {
    /**
     * Validação para criar uma nova postagem.
     * Valida que descricao e fotos estejam dentro dos limites permitidos.
     * @param {Object} req - Requisição HTTP
     * @param {Object} res - Resposta HTTP
     * @param {Function} next - Próxima função de middleware
     * @returns {void} Chama next() se validação passar ou retorna erro 400
     */
    createSchema(req, res, next) {
        const schema = Joi.object({
            descricao: Joi.string().max(1400).allow(null, '').messages({
                'string.max': 'A descrição não pode exceder 1400 caracteres.'
            }),
            fotos: Joi.array().items(Joi.string().uri()).allow(null).messages({
                'array.base': 'O campo "fotos" deve ser um array de URLs.',
                'string.uri': 'Todas as fotos devem ser URLs válidas.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(400).json({ error: messages });
        }
        next();
    }

    /**
     * Validação para atualizar uma postagem.
     * Valida que descricao e fotos estejam dentro dos limites permitidos.
     * @param {Object} req - Requisição HTTP
     * @param {Object} res - Resposta HTTP
     * @param {Function} next - Próxima função de middleware
     * @returns {void} Chama next() se validação passar ou retorna erro 400
     */
    updateSchema(req, res, next) {
        const schema = Joi.object({
            descricao: Joi.string().max(1400).allow(null, '').messages({
                'string.max': 'A descrição não pode exceder 1400 caracteres.'
            }),
            fotos: Joi.array().items(Joi.string().uri()).allow(null).messages({
                'array.base': 'O campo "fotos" deve ser um array de URLs.',
                'string.uri': 'Todas as fotos devem ser URLs válidas.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(400).json({ error: messages });
        }
        next();
    }

    /**
     * Validação para ID da postagem nos parâmetros da rota.
     * Valida que o ID seja um número inteiro positivo.
     * @param {Object} req - Requisição HTTP
     * @param {Object} res - Resposta HTTP
     * @param {Function} next - Próxima função de middleware
     * @returns {void} Chama next() se validação passar ou retorna erro 400
     */
    validatePostagemIdParam(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID deve ser um número.',
                'number.positive': 'O ID deve ser um número positivo.',
                'any.required': 'O ID é obrigatório.'
            })
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(400).json({ error: messages });
        }
        next();
    }

    /**
     * Validação para ID do usuário nos parâmetros da rota.
     * Valida que o userId seja um número inteiro positivo.
     * @param {Object} req - Requisição HTTP
     * @param {Object} res - Resposta HTTP
     * @param {Function} next - Próxima função de middleware
     * @returns {void} Chama next() se validação passar ou retorna erro 400
     */
    validateUserIdParam(req, res, next) {
        const schema = Joi.object({
            userId: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID do usuário deve ser um número.',
                'number.positive': 'O ID do usuário deve ser um número positivo.',
                'any.required': 'O ID do usuário é obrigatório.'
            })
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(400).json({ error: messages });
        }
        next();
    }
}

module.exports = new PostagemValidation();
