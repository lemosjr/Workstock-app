const Joi = require('joi');

class EmpresaValidation {
    // Validação para criar ou atualizar perfil empresarial
    createOrUpdateSchema(req, res, next) {
        const schema = Joi.object({
            descricao: Joi.string().min(10).max(500).allow(null, '').messages({
                'string.min': 'A descrição deve conter no mínimo 10 caracteres.',
                'string.max': 'A descrição deve conter no máximo 500 caracteres.'
            }),
            avaliacao_media: Joi.number().min(0).max(5).precision(2).allow(null, '').messages({
                'number.min': 'A avaliação média deve ser no mínimo 0.',
                'number.max': 'A avaliação média deve ser no máximo 5.',
                'number.precision': 'A avaliação média deve ter no máximo 2 casas decimais.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para atualizar avaliação da empresa
    updateAvaliacaoSchema(req, res, next) {
        const schema = Joi.object({
            avaliacao: Joi.number().min(0).max(5).precision(1).required().messages({
                'number.base': 'A avaliação deve ser um número.',
                'number.min': 'A avaliação deve ser no mínimo 0.',
                'number.max': 'A avaliação deve ser no máximo 5.',
                'any.required': 'O campo avaliação é obrigatório.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para parâmetros de rota (ID do usuário)
    validateUsuarioIdParam(req, res, next) {
        const schema = Joi.object({
            usuarioId: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID do usuário deve ser um número.',
                'number.integer': 'O ID do usuário deve ser um número inteiro.',
                'number.positive': 'O ID do usuário deve ser um número positivo.',
                'any.required': 'O ID do usuário é obrigatório.'
            })
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }
}

module.exports = new EmpresaValidation();