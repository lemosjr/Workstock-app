const Joi = require('joi');

class ServiceValidation {
    // Validação para a Criação de uma Nova Solicitação de Serviço
    createSchema(req, res, next) {
        const schema = Joi.object({
            categoria: Joi.string().min(3).max(150).required().messages({
                'string.empty': 'O campo categoria não pode estar vazio.',
                'string.min': 'A categoria deve conter no mínimo 3 caracteres.',
                'any.required': 'O campo categoria é obrigatório.'
            }),
            tipo_imovel: Joi.string().min(3).max(100).required().messages({
                'string.empty': 'O campo tipo_imovel não pode estar vazio.',
                'any.required': 'O campo tipo_imovel é obrigatório.'
            }),
            endereco: Joi.string().min(5).max(255).required().messages({
                'string.empty': 'O endereço não pode estar vazio.',
                'string.min': 'O endereço deve ser mais detalhado (mínimo 5 caracteres).',
                'any.required': 'O campo endereço é obrigatório.'
            }),
            coordenadas: Joi.string().max(100).allow(null, '').pattern(/^-?\d+\.?\d*,-?\d+\.?\d*$/).messages({
                'string.pattern.base': 'As coordenadas devem estar no formato "latitude,longitude" (ex: -3.7327,-38.5031)'
            }),
            prazo_urgencia: Joi.string().min(2).max(100).required().messages({
                'string.empty': 'Informe o prazo de urgência para o serviço.',
                'any.required': 'O campo prazo_urgencia é obrigatório.'
            }),
            faixa_preco: Joi.string().min(2).max(100).required().messages({
                'string.empty': 'Determine uma estimativa ou faixa de preço aceitável.',
                'any.required': 'O campo faixa_preco é obrigatório.'
            }),
            foto: Joi.string().max(255).allow(null, '').uri().messages({
                'string.uri': 'A URL da foto deve ser válida.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para a Atualização de dados ou Status do Serviço
    updateSchema(req, res, next) {
        const schema = Joi.object({
            categoria: Joi.string().min(3).max(150),
            tipo_imovel: Joi.string().min(3).max(100),
            endereco: Joi.string().min(5).max(255),
            coordenadas: Joi.string().max(100).allow(null, '').pattern(/^-?\d+\.?\d*,-?\d+\.?\d*$/).messages({
                'string.pattern.base': 'As coordenadas devem estar no formato "latitude,longitude" (ex: -3.7327,-38.5031)'
            }),
            prazo_urgencia: Joi.string().min(2).max(100),
            faixa_preco: Joi.string().min(2).max(100),
            status_solicitacao: Joi.string().valid('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO').messages({
                'any.only': 'O status deve ser estritamente: ABERTO, EM_ANDAMENTO, CONCLUIDO ou CANCELADO.'
            }),
            foto: Joi.string().max(255).allow(null, '').uri().messages({
                'string.uri': 'A URL da foto deve ser válida.'
            })
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }

    // Validação para filtros de listagem de serviços
    listFiltersSchema(req, res, next) {
        const schema = Joi.object({
            category: Joi.string().min(2).max(150).messages({
                'string.min': 'A categoria deve ter no mínimo 2 caracteres.',
                'string.max': 'A categoria deve ter no máximo 150 caracteres.'
            }),
            tipo_imovel: Joi.string().min(2).max(100),
            status: Joi.string().valid('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO').messages({
                'any.only': 'Status inválido. Use: ABERTO, EM_ANDAMENTO, CONCLUIDO ou CANCELADO.'
            }),
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(20)
        });

        const { error } = schema.validate(req.query, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    }
}

module.exports = new ServiceValidation();