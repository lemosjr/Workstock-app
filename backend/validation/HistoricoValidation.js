const Joi = require('joi');

class HistoricoValidation {
    // Validação para adicionar observação manual ao histórico
    addObservacaoSchema(req, res, next) {
        const schema = Joi.object({
            comentario: Joi.string().min(3).max(255).allow(null, '').messages({
                'string.min': 'O comentário deve conter no mínimo 3 caracteres.',
                'string.max': 'O comentário deve conter no máximo 255 caracteres.'
            }),
            observacao: Joi.string().min(5).max(1000).allow(null, '').messages({
                'string.min': 'A observação deve conter no mínimo 5 caracteres.',
                'string.max': 'A observação deve conter no máximo 1000 caracteres.'
            })
        }).custom((value, helpers) => {
            if (!value.comentario && !value.observacao) {
                return helpers.error('any.required', {
                    message: 'É necessário fornecer pelo menos um comentário ou observação.'
                });
            }
            return value;
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }
        next();
    }

    updateObservacaoSchema(req, res, next) {
        const schema = Joi.object({
            comentario: Joi.string().min(3).max(255).allow(null, '').messages({
                'string.min': 'O comentário deve conter no mínimo 3 caracteres.',
                'string.max': 'O comentário deve conter no máximo 255 caracteres.'
            }),
            observacao: Joi.string().min(5).max(1000).allow(null, '').messages({
                'string.min': 'A observação deve conter no mínimo 5 caracteres.',
                'string.max': 'A observação deve conter no máximo 1000 caracteres.'
            })
        }).custom((value, helpers) => {
            if (!value.comentario && !value.observacao) {
                return helpers.error('any.required', {
                    message: 'É necessário fornecer pelo menos um comentário ou observação para atualizar.'
                });
            }
            return value;
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }
        next();
    }

    // ADICIONAR middleware de validação nas rotas que usam parâmetros
    validateIdParam(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID deve ser um número.',
                'number.integer': 'O ID deve ser um número inteiro.',
                'number.positive': 'O ID deve ser um número positivo.',
                'any.required': 'O ID é obrigatório.'
            })
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para ID do serviço nos parâmetros
    validateServiceIdParam(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID do serviço deve ser um número.',
                'number.integer': 'O ID do serviço deve ser um número inteiro.',
                'number.positive': 'O ID do serviço deve ser um número positivo.',
                'any.required': 'O ID do serviço é obrigatório.'
            })
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para ID do histórico nos parâmetros
    validateHistoricoIdParam(req, res, next) {
        const schema = Joi.object({
            historicoId: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID do histórico deve ser um número.',
                'number.integer': 'O ID do histórico deve ser um número inteiro.',
                'number.positive': 'O ID do histórico deve ser um número positivo.',
                'any.required': 'O ID do histórico é obrigatório.'
            })
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para filtros de consulta (query parameters)
    validateHistoricoFilters(req, res, next) {
        const schema = Joi.object({
            page: Joi.number().integer().min(1).default(1).messages({
                'number.base': 'O parâmetro page deve ser um número.',
                'number.integer': 'O parâmetro page deve ser um número inteiro.',
                'number.min': 'O parâmetro page deve ser no mínimo 1.'
            }),
            limit: Joi.number().integer().min(1).max(100).default(20).messages({
                'number.base': 'O parâmetro limit deve ser um número.',
                'number.integer': 'O parâmetro limit deve ser um número inteiro.',
                'number.min': 'O parâmetro limit deve ser no mínimo 1.',
                'number.max': 'O parâmetro limit deve ser no máximo 100.'
            }),
            startDate: Joi.date().iso().messages({
                'date.base': 'A data inicial deve ser uma data válida.',
                'date.format': 'A data inicial deve estar no formato ISO (YYYY-MM-DD).'
            }),
            endDate: Joi.date().iso().min(Joi.ref('startDate')).messages({
                'date.base': 'A data final deve ser uma data válida.',
                'date.format': 'A data final deve estar no formato ISO (YYYY-MM-DD).',
                'date.min': 'A data final deve ser maior ou igual à data inicial.'
            }),
            status: Joi.string().valid('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO').messages({
                'any.only': 'O status deve ser: ABERTO, EM_ANDAMENTO, CONCLUIDO ou CANCELADO.'
            })
        });

        const { error } = schema.validate(req.query, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        // Anexa os valores validados e padronizados no req
        req.validatedFilters = schema.validate(req.query).value;
        next();
    }
}

module.exports = new HistoricoValidation();