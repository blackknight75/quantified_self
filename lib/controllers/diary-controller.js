const Diary = require('../models/diary')

function create(request, response){
  Diary.make(request.body)
  .then((data) =>{
    response.json(data.rows)
  })
}

function getMeals(request, response){
  Diary.getMeals(request.body)
  .then((data) =>{
    response.json(data.rows)
  })
}

module.exports = {
  create: create,
  getMeals: getMeals
}
