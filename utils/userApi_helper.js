const initialUser = {
    username: 'superuser',
    name: 'root',
    password: 'password',
};

const validUser = {
    username: 'test',
    name: 'Test User',
    password: 'password',
};

const invalidUsername = {
    username: 'te',
    name: 'Test User',
    password: 'pass',
};

const repeatedUsername = {
    username: 'test',
    name: 'Test User',
    password: 'password',
};

const invalidPassword = {
    username: 'test',
    name: 'Test User',
    password: 'pa',
};

module.exports = {
    initialUser,
    validUser,
    repeatedUsername,
    invalidUsername,
    invalidPassword,
};
