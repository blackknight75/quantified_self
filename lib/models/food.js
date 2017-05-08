const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function findAll(id) {
  return database.raw('SELECT * FROM food')
}

module.exports = {
  findAll: findAll
}
