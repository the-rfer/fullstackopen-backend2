const { error } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    error('ERROR NAME:', err.name);
    error('ERROR MESSAGE:', err.message);

    switch (err.name) {
        case 'CastError':
            return res.status(400).json({ error: 'malformatted id' });

        case 'ValidationError':
            return res.status(400).json({ error: err.message });

        case 'MongoServerError':
            return res.status(400).json({ error: 'username already taken' });

        case 'JsonWebTokenError':
            return response.status(401).json({ error: 'token invalid' });

        default:
            next(error);
    }
};

module.exports = errorHandler;
