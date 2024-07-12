const initialBlogPosts = [
    {
        title: 'First Post',
        url: 'First Test',
        likes: 420,
    },
    {
        title: 'Second Post',
        url: 'Second Test',
        likes: 69,
    },
];

const newBlogPost = {
    title: 'Third Post',
    url: 'Third Test',
    likes: 360,
};

const newBlogPostWithoutLikes = {
    title: 'Third Post',
    url: 'Third Test',
};

const newBlogPostWithoutTitle = {
    url: 'Third Test',
    likes: 360,
};

module.exports = {
    initialBlogPosts,
    newBlogPost,
    newBlogPostWithoutLikes,
    newBlogPostWithoutTitle,
};
