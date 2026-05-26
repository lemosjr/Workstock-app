const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'workstock-backend' },
    transports: [
        // Salva os erros criticamente em um arquivo local
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Salva o histórico combinado completo
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

// Se não estiver em produção, printa no terminal com cores organizadas
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

module.exports = logger;