// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URI,
    
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './migrations',
    },
    seeds: {
      directory: "./seeds/",
    },
  },
};
