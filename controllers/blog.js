const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');

blogRouter.get('/api/blogs', (request, response) => {
    Blog.find({})
        .then((blogs) => {
            response.json(blogs);
        })
        .catch((err) => {
            error(err);
        });
});

blogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog.save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((err) => {
            error(err);
        });
});

module.exports = blogRouter;
