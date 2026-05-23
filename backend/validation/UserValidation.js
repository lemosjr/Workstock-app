const Joi = require('joi');

class UserValidation {
    // Validação para o Cadastro de Conta [RF002]
    registerSchema(req, res, next) {
        const schema = Joi.object({
            nome_razao: Joi.string().min(3).max(150).required().messages({
                'string.empty': 'O campo nome_razao não pode estar vazio.',
                'string.min': 'O nome_razao deve conter no mínimo 3 caracteres.',
                'any.required': 'O campo nome_razao é obrigatório.'
            }),
            email: Joi.string().email().required().messages({
                'string.email': 'Insira um endereço de e-mail válido.',
                'any.required': 'O campo e-mail é obrigatório.'
            }),
            cpf_cnpj: Joi.string().min(11).max(14).required().messages({
                'string.min': 'O campo cpf_cnpj deve ter no mínimo 11 dígitos.',
                'string.max': 'O campo cpf_cnpj deve ter no máximo 14 dígitos.',
                'any.required': 'O campo cpf_cnpj é obrigatório.'
            }),
            senha: Joi.string().min(6).required().messages({
                'string.min': 'A senha deve conter no mínimo 6 caracteres.',
                'any.required': 'A senha é obrigatória.'
            }),
            telefone: Joi.string().max(20).allow(null, ''),
            foto_perfil: Joi.string().max(255).allow(null, ''),
            tipo_usuario: Joi.string().valid('PROPRIETARIO', 'EMPRESA', 'ADMIN').required().messages({
                'any.only': 'O tipo_usuario deve ser PROPRIETARIO, EMPRESA ou ADMIN.',
                'any.required': 'O campo tipo_usuario é obrigatório.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para o Efetuar Login [RF001]
    loginSchema(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Insira um e-mail válido para o login.',
                'any.required': 'O e-mail é obrigatório.'
            }),
            senha: Joi.string().required().messages({
                'any.required': 'A senha é obrigatória.'
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

module.exports = new UserValidation();