const userRouter = require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (!password)
        return response
            .status(400)
            .json({ error: 'password is required' })
            .end();
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

userRouter.get('/', async (_, response) => {
    const foundUsers = await User.find({}).populate('blogs', {
        title: 1,
        url: 1,
        likes: 1,
    });
    response.json(foundUsers);
});

module.exports = userRouter;
