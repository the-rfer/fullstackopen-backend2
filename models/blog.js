const { info, error } = require('../utils/logger');
const { MONGOURL } = require('../utils/config');
const mongoose = require('mongoose');

info('Connecting to MongoDB...');

mongoose
    .connect(MONGOURL)
    .then(() => {
        info('Connected to MongoDB!');
    })
    .catch((err) => {
        error(err);
    });

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

module.exports = mongoose.model('Blog', blogSchema);
