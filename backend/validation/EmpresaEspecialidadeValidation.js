const Joi = require('joi');

class EmpresaEspecialidadeValidation {
    // Validação para vincular uma especialidade a uma empresa
    linkSchema(req, res, next) {
        const schema = Joi.object({
            id_especialidade: Joi.number().integer().positive().required().messages({
                'number.base': 'O ID da especialidade deve ser um número.',
                'number.integer': 'O ID da especialidade deve ser um número inteiro.',
                'number.positive': 'O ID da especialidade deve ser um número positivo.',
                'any.required': 'O campo id_especialidade é obrigatório.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }
}

module.exports = new EmpresaEspecialidadeValidation();
