const Food = require('../models/food')

function index(request, response){
  Food.all()
  .then((data) => {
    let food = data.rows
    if (!food || food == []) {
      return response.sendStatus(404)
    }else{
      return response.json(food)
    };
  });
}

function show(request, response){
  Food.find(request.params.id)
  .then((data) => {
    let food = data.rows[0]
    if (!food) {
      response.sendStatus(404)
    }else{
      response.json(food)
    };
  });
}

function create(request, response){
  Food.make(request.body)
  .then((data) => {
    response.json(data.rows)
  })
}

function update(request, response){
  Food.change(request.body, request.params.id)
  .then((data) => {
    response.json(data)
  })
}

function destroy(request, response){
  Food.destroy(request.params.id)
  .then((data) => {
    response.sendStatus(200)
  })
}


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
}
