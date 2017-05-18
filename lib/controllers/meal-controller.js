const Meal = require('../models/meal')
const pry = require('pryjs')

function create(request, response){
  eval(pry.it)
  Meal.make(request.body)
  .then((data) =>{
    response.json(data.rows)
  })
}

module.exports = {
  create: create
}
