const userRouter = require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

userRouter.post('/api/users', async (request, response) => {
    const { username, name, password } = request.body;

    if (password.length < 3)
        return response.status(400).json({ error: 'password too short' }).end();

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

userRouter.get('/api/users', async (_, response) => {
    const foundUsers = await User.find({});
    response.json(foundUsers);
});

module.exports = userRouter;
