require("dotenv").config();
module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: "postgres",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
