// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URI,
      //host: process.env.DB_HOST,
      //user: process.env.DB_USER,
      //password: process.env.DB_PASS,
      //database: process.env.DB_NAME,
      //ssl: false,
      // connectionString: process.env.DB_URI,
      // ssl: { rejectUnauthorized: false },
    
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds/",
    },
  },
};
