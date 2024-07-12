const blogRouter = require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const Blog = require('../models/blogSchema');

blogRouter.get('/', async (_, response) => {
    const foundBlogs = await Blog.find({}).populate('author', {
        username: 1,
        name: 1,
    });
    response.json(foundBlogs);
});

blogRouter.post('/', userExtractor, async (request, response) => {
    const { title, url, likes } = request.body;

    const user = request.user;

    if (!user)
        return response.status(401).json({ error: 'Authentication required' });

    const blog = new Blog({
        title: title,
        author: user.id,
        url: url,
        likes: likes || 0,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user;

    if (!user)
        return response.status(401).json({ error: 'Authentication required' });

    const blog = await Blog.findById(request.params.id);

    if (!blog) return response.status(404).json({ error: 'blog not found' });

    if (!(blog.author.toString() === user._id.toString()))
        return response
            .status(401)
            .json({ error: 'only the author can delete this post' });

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
});

blogRouter.put('/:id', userExtractor, async (request, response) => {
    const user = request.user;

    if (!user)
        return response.status(401).json({ error: 'Authentication required' });

    const updatedPost = await Blog.findByIdAndUpdate(
        request.params.id,
        { $inc: { likes: 1 } },
        { new: true, context: 'query' }
    );

    if (!updatedPost) return response.status(404).end();

    response.json(updatedPost);
});

module.exports = blogRouter;
