const Food = require('../models/food')

function index(request, response){
  Food.all()
  .then((data) => {
    let food = data.rows
    if (!food || food == []) {
      response.sendStatus(404)
    }else{
      response.json(food)
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
  Food.create(request.body.name, request.body.calories, request.body.created_at, request.body.updated_at)
  .then((data) => {
    new_food = data.rows[0]
    response.json(new_food)
  })
}

function update(request, response){
  const updateName = request.body.name
  const updateCal = request.body.calories
  Food.update(updateName, updateCal)
  .then((data) => {
    updated_food = data.rows
    response.json(updated_food)
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
