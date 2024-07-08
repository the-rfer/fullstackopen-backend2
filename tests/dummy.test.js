const { test, describe } = require('node:test');
const assert = require('node:assert');
const {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    dummyBlogs,
} = require('../utils/list_helper');

describe('My custom test', () => {
    test('dummy returns one', () => {
        const blogs = [];

        const result = dummy(blogs);
        assert.strictEqual(result, 1);
    });
});

describe('Total likes', () => {
    test('of empty list is zero', () => {
        const result = totalLikes([]);
        assert.strictEqual(result, 0);
    });
    test('when list has only one blog equals the likes of that', () => {
        const result = totalLikes(dummyBlogs[0]);
        assert.strictEqual(result, dummyBlogs[0].likes);
    });
    test('of a bigger list is calculated right', () => {
        const result = totalLikes(dummyBlogs);
        assert.strictEqual(result, 36);
    });
});

describe('Favorite blog post', () => {
    test('post with the most likes', () => {
        const result = favoriteBlog(dummyBlogs);
        assert.deepStrictEqual(result, dummyBlogs[2]);
    });
});

describe('Author with most ...', () => {
    test('blog posts', () => {
        const result = mostBlogs(dummyBlogs);
        assert.deepStrictEqual(result, {
            author: 'Robert C. Martin',
            blogs: 3,
        });
    });

    test('total blog likes', () => {
        const result = mostLikes(dummyBlogs);
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            likes: 17,
        });
    });
});
