const Joi = require('joi');

class AvaliacaoValidation {
    // Validação para criar ou atualizar perfil empresarial
    // createSchema(req, res, next) {
    //     const schema = Joi.object({
    //         descricao: Joi.string().min(10).max(500).allow(null, '').messages({
    //             'string.min': 'A descrição deve conter no mínimo 10 caracteres.',
    //             'string.max': 'A descrição deve conter no máximo 500 caracteres.'
    //         }),
    //         avaliacao_media: Joi.number().min(0).max(5).precision(2).allow(null, '').messages({
    //             'number.min': 'A avaliação média deve ser no mínimo 0.',
    //             'number.max': 'A avaliação média deve ser no máximo 5.',
    //             'number.precision': 'A avaliação média deve ter no máximo 2 casas decimais.'
    //         })
    //     });

    //     const { error } = schema.validate(req.body, { abortEarly: false });
        
    //     if (error) {
    //         const errors = error.details.map(detail => detail.message);
    //         return res.status(400).json({ errors });
    //     }

    //     next();
    // }



}

module.exports = new AvaliacaoValidation();