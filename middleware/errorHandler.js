const { error } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    error('ERROR NAME:', err.name);
    error('ERROR MESSAGE:', err.message);

    switch (err.name) {
        case 'CastError':
            return res.status(400).json({ error: 'malformatted id' });

        case 'ValidationError':
            return res.status(400).json({ error: err.message });

        default:
            next(error);
    }
};

module.exports = errorHandler;
