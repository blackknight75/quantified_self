const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function destroy(id) {
  return database.raw('DELETE FROM meal_food WHERE id = ?', [id])
}

module.exports = {
  destroy: destroy
}
