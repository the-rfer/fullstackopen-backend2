const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/userSchema');
const {
    initialUser,
    validUser,
    repeatedUsername,
    invalidUsername,
    invalidPassword,
} = require('../utils/userApi_helper');
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    let user = new User(initialUser);
    await user.save();
});

describe('Testing user creation and validation', () => {
    // criar tests para:
    // validar user OK,
    // username not unique,
    // password short,
    // nome short.
});

after(async () => {
    await mongoose.connection.close();
});
