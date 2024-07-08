require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL);

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
