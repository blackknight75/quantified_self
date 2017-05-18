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
  Diary.find(request.params.date)
  .then((data) => {
    let diary = data.rows
    if (!diary) {
      response.sendStatus(404)
    }else{
      response.json(diary)
    };
  });
}

function getDiaryId(request, response){
  Diary.getDiaryId(request.params.date)
  .then((data) =>{
    response.json(data.rows)
  })
}

module.exports = {
  create: create,
  getMeals: getMeals,
  show: show,
  getDiaryId: getDiaryId
}
