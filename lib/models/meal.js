const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)
const pry = require('pryjs')

function make(params) {
  return database.raw('INSERT INTO meals (category, diary_id) VALUES (?, ?)', [params.category, params.diary_id])
}

module.exports = {
  make: make
}
