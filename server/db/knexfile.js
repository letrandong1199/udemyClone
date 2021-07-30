// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      database: "udemy_local",
      user: "root",
      password: "11143",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
};
