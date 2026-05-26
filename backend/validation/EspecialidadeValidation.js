const Joi = require('joi');

class EspecialidadeValidation {
    // Validação para criar ou atualizar uma especialidade
    createOrUpdateSchema(req, res, next) {
        const schema = Joi.object({
            nome: Joi.string().min(3).max(100).required().messages({
                'string.min': 'O nome deve conter no mínimo 3 caracteres.',
                'string.max': 'O nome deve conter no máximo 100 caracteres.',
                'any.required': 'O campo nome é obrigatório.'
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

module.exports = new EspecialidadeValidation();
