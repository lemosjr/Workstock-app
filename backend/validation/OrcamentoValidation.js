const { z } = require('zod');

const orcamentoSchema = z.object({
  id_servico: z.number().int(),
  id_empresa: z.number().int(),
  valor_estimado: z.number().positive(),
  prazo_estimado: z.string().min(1),
  descricao_tecnica: z.string().optional(),
  status_proposta: z.enum(['pendente', 'aprovado', 'rejeitado']).optional()
});

const validateOrcamento = (req, res, next) => {
  try {
    orcamentoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};

module.exports = { validateOrcamento };