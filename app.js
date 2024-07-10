const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
require('express-async-errors');
const blogRouter = require('./controllers/blogRoutes');
const userRouter = require('./controllers/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/blogs', blogRouter);

app.post('/api/blogs', blogRouter);

app.delete('/api/blogs/:id', blogRouter);

app.put('/api/blogs/:id', blogRouter);

app.get('/api/users', userRouter);

app.post('/api/users', userRouter);

app.use(errorHandler);

module.exports = app;
