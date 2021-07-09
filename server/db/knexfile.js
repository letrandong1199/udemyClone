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
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
};

