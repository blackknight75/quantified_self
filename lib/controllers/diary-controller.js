const Diary = require('../models/diary')
const pry = require('pryjs')
function create(request, response){
  Diary.make(request.body)
  .then((data) =>{
    response.json(data.rows)
  })
}

function getMeals(request, response){
  Diary.getMeals(request.params)
  .then((data) =>{
    response.json(data.rows)
  })
}

function show(request, response){
  Diary.find(request.params.id)
  .then((data) => {
    let diary = data.rows[0]
    if (!diary) {
      response.sendStatus(404)
    }else{
      response.json(diary)
    };
  });
}

module.exports = {
  create: create,
  getMeals: getMeals,
  show: show
}
