const Joi = require('joi');

class UserValidation {
    registerSchema(req, res, next) {
        const schema = Joi.object({
            nome_razao: Joi.string().min(3).max(150).required(),
            email: Joi.string().email().required(),
            cpf_cnpj: Joi.string().pattern(/^\d{11}$|^\d{14}$/).required().messages({
                'string.pattern.base': 'CPF/CNPJ deve ter 11 ou 14 dígitos numéricos'
            }),
            senha: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
                'string.pattern.base': 'A senha deve ter: mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial (@$!%*?&)'
            }),
            telefone: Joi.string().pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/).allow(null, ''),
            foto_perfil: Joi.string().max(255).allow(null, ''),
            tipo_usuario: Joi.string().valid('PROPRIETARIO', 'EMPRESA', 'ADMIN').required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(d => d.message) });
        }
        next();
    }

    loginSchema(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(d => d.message) });
        }
        next();
    }

    // NOVO: Schema para solicitar recuperação
    solicitarRecuperacaoSchema(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(d => d.message) });
        }
        next();
    }

    // NOVO: Schema para redefinir senha
    redefinirSenhaSchema(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().length(6).pattern(/^\d+$/).required(),
            novaSenha: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
            confirmarSenha: Joi.string().valid(Joi.ref('novaSenha')).required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(d => d.message) });
        }
        next();
    }
}

module.exports = new UserValidation();