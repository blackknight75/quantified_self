const Food = require('../models/food')

function index(request, response){
  Food.findAll(request.params.id)
  .then((data) => {
    let food = data.rows
    if (food == null) {
      response.sendStatus(404)
    }else{
      response.json(food)
    }
  })
}

module.exports = {
  index: index
}
