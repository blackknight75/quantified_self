const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function make(params) {
  return database.raw('INSERT INTO diary (date, created_at, updated_at) VALUES (?, ?, ?) RETURNING *', [params.date, params.created_at, params.updated_at])
}

module.exports = {
  make: make 
}