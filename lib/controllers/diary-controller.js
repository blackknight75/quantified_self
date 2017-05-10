const Diary = require('../models/diary')

function create(request, response){
  Diary.make(request.body)
  .then((data) =>{
    response.json(data.rows)
  })
}
