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

function find(date){
  return database.raw(`SELECT diaries.date, food.name, food.calories, meals.category, meal_food.id
                       FROM food INNER JOIN meal_food
                       ON food.id = meal_food.food_id
                       INNER JOIN meals ON meal_food.meal_id = meals.id
                       INNER JOIN diaries ON meals.diary_id = diaries.id
                       WHERE diaries.date = '${date}'`)
}

module.exports = {
  make: make,
  getMeals: getMeals,
  find: find
}
