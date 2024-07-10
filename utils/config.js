require('dotenv').config();

const PORT = process.env.PORT;
const MONGOURL =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_MONGO_URL
        : process.env.MONGO_URL;

const USER_DB =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_USER_DB
        : process.env.USER_DB;

module.exports = {
    PORT,
    MONGOURL,
    USER_DB,
};
