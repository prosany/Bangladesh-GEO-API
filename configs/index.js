require('dotenv').config();

exports.config = {
  PORT: process.env.PORT || 1000,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
};
