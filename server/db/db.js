const knex = require("knex");
const knexfile = require("./knexfile");
require("dotenv").config();
const db = knex(knexfile[process.env.NODE_ENV]);

module.exports = db;
