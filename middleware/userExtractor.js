const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const userExtractor = async (request, response, next) => {
    if (!request.token)
        return response.status(401).json({ error: 'Auth is required' });

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id)
        return response.status(401).json({ error: 'token invalid' });

    request.user = await User.findById(decodedToken.id);

    next();
};

module.exports = userExtractor;
