require('dotenv').config();

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

module.exports = {
    PORT,
    MONGOURL,
};
