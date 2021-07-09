// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "knex_tutorial",
      user: "postgres",
      password: "admin",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds/",
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      //url: process.env.DATABASE_URI + `?ssl=true`,
      //ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds/",
    },
  },
};
