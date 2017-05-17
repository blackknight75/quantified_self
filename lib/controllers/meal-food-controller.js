const MealFood = require('../models/meal-food')

function destroy(request, response){
  MealFood.destroy(request.params.id)
  .then((data) => {
    response.sendStatus(200)
  })
}

module.exports = {
  destroy: destroy
}
