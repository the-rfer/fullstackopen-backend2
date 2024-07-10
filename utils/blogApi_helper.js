const initialBlogPosts = [
    {
        title: 'First Post',
        author: 'First Author',
        url: 'First Test',
        likes: 420,
    },
    {
        title: 'Second Post',
        author: 'Second Author',
        url: 'Second Test',
        likes: 69,
    },
];

const newBlogPost = {
    title: 'Third Post',
    author: 'Third Author',
    url: 'Third Test',
    likes: 360,
};

const newBlogPostWithoutLikes = {
    title: 'Third Post',
    author: 'Third Author',
    url: 'Third Test',
};

const newBlogPostWithoutTitle = {
    author: 'Third Author',
    url: 'Third Test',
    likes: 360,
};

module.exports = {
    initialBlogPosts,
    newBlogPost,
    newBlogPostWithoutLikes,
    newBlogPostWithoutTitle,
};
