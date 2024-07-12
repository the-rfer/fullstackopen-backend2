const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const tokenExtractor = require('./middleware/tokenExtractor');
require('express-async-errors');
const blogRouter = require('./controllers/blogRoutes');
const userRouter = require('./controllers/userRoutes');
const loginRouter = require('./controllers/loginRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);

app.use('/api/users', userRouter);

app.use('/api/login', loginRouter);

app.use(errorHandler);

module.exports = app;
