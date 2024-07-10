const dummyBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
];

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    if (!Array.isArray(blogs)) return blogs.likes;
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, current) => {
        return current.likes > max.likes ? current : max;
    }, blogs[0]);
};

const mostBlogs = (blogs) => {
    const blogCounts = blogs.reduce((acc, blog) => {
        if (acc[blog.author]) {
            acc[blog.author]++;
        } else {
            acc[blog.author] = 1;
        }
        return acc;
    }, {});

    let maxBlogs = 0;
    let topAuthor = '';

    for (const author in blogCounts) {
        if (blogCounts[author] > maxBlogs) {
            maxBlogs = blogCounts[author];
            topAuthor = author;
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs,
    };
};

const mostLikes = (blogs) => {
    const blogCounts = blogs.reduce((acc, blog) => {
        if (acc[blog.author]) {
            acc[blog.author] += blog.likes;
        } else {
            acc[blog.author] = blog.likes;
        }
        return acc;
    }, {});

    let maxLikes = 0;
    let topAuthor = '';

    for (const author in blogCounts) {
        if (blogCounts[author] > maxLikes) {
            maxLikes = blogCounts[author];
            topAuthor = author;
        }
    }

    return {
        author: topAuthor,
        likes: maxLikes,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    dummyBlogs,
};
