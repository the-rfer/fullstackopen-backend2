const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/api/blogs', async (_, response) => {
    const foundBlogs = await Blog.find({});
    response.json(foundBlogs);
});

blogRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body);

    const savedBlog = await blog.save();

    response.status(201).json(savedBlog);
});

blogRouter.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

blogRouter.put('/api/blogs/:id', async (request, response) => {
    const updatedPost = await Blog.findByIdAndUpdate(
        request.params.id,
        { $inc: { likes: 1 } },
        { new: true, context: 'query' }
    );

    if (!updatedPost) return response.status(404).end();

    response.json(updatedPost);
});

module.exports = blogRouter;
