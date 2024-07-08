const express = require('express');
const cors = require('cors');
const Blog = require('./models/blog');
const blogRouter = require('./controllers/blog');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/blogs', blogRouter);

app.post('/api/blogs', blogRouter);

module.exports = app;
