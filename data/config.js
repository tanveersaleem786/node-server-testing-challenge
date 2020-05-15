const knex = require("knex")
const knexFile = require("../knexfile")

module.exports = knex(knexFile[process.env.MODE_ENV])