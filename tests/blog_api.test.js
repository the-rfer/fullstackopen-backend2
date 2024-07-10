const { test, after, beforeEach, describe } = require('node:test');
const {
    initialBlogPosts,
    newBlogPost,
    newBlogPostWithoutLikes,
    newBlogPostWithoutTitle,
} = require('../utils/blogApi_helper');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogSchema');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogPost = new Blog(initialBlogPosts[0]);
    await blogPost.save();

    blogPost = new Blog(initialBlogPosts[1]);
    await blogPost.save();
});

describe('Blog API tests', () => {
    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Returning the correct amount of blogs', async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, 2);
    });

    test('Blog posts include ID property', async () => {
        const response = await api.get('/api/blogs');
        const allHaveId = response.body.every((blog) =>
            blog.hasOwnProperty('id')
        );
        assert.strictEqual(allHaveId, true);
    });

    test('Adding a new blog post', async () => {
        const response1 = await api.get('/api/blogs');
        await api.post('/api/blogs').send(newBlogPost).expect(201);
        const response2 = await api.get('/api/blogs');
        assert.strictEqual(response1.body.length + 1, response2.body.length);
    });

    test('Like field is defaulted to 0 if not present in request', async () => {
        const response = await api
            .post('/api/blogs')
            .send(newBlogPostWithoutLikes)
            .expect(201);

        assert.strictEqual(response.body.hasOwnProperty('likes'), true);
        assert.strictEqual(response.body.likes, 0);
    });

    test('Missing fields other than likes returns 400', async () => {
        await api.post('/api/blogs').send(newBlogPostWithoutTitle).expect(400);
    });

    test('Deleting a blog post', async () => {
        const response = await api.get('/api/blogs');
        const id = response.body[0].id;
        await api.delete(`/api/blogs/${id}`).expect(204);
    });

    test('Incrementing likes', async () => {
        const response = await api.get('/api/blogs');
        const id = response.body[0].id;
        const updatedPost = await api
            .put(`/api/blogs/${id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        assert(response.body[0].likes < updatedPost.body.likes);
    });
});

after(async () => {
    await mongoose.connection.close();
});
