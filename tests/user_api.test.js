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
    test('valid user created', async () => {
        const response = await api
            .post('/api/users')
            .send(validUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        assert(response.body.username === validUser.username);
    });

    test('username not unique', async () => {
        const response = await api
            .post('/api/users')
            .send(repeatedUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        assert(response.body.error === 'username already taken');
    });

    test('password too short', async () => {
        const response = await api
            .post('/api/users')
            .send(invalidPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        assert(response.body.error === 'password too short');
    });

    test('username too short', async () => {
        await api
            .post('/api/users')
            .send(invalidUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

after(async () => {
    await mongoose.connection.close();
});
