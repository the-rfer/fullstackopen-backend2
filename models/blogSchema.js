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
    title: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

blogSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
