const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)
const pry = require('pryjs')

function make(params) {
  return database.raw('INSERT INTO diary (date, created_at, updated_at) VALUES (?, ?, ?) RETURNING *', [params.date, params.created_at, params.updated_at])
}

function getMeals(params) {
  const id = params['id']
  return database.raw('SELECT * FROM meals WHERE diary_id = ' + id.toString())
}

function find(id){
  return database.raw('SELECT * FROM diaries WHERE id = ? LIMIT 1', [id])
}

module.exports = {
  make: make,
  getMeals: getMeals,
  find: find
}
