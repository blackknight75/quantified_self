const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function all() {
  return database.raw('SELECT * FROM food')
}

function find(id) {
  return database.raw('SELECT * FROM food WHERE id = ? LIMIT 1', [id])
}

function create(params) {
  return database.raw('INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING *')
}

function update(data, params) {
  return database.raw('UPDATE food SET name = ?, calories = ?, updated_at = ?, WHERE id = ? RETURNING *', [data.name || params.name, data.calories || params.calories, new Date, params.id])
  .then((data) => {
    return data.rows
  })
}

function destroy(id) {
  return database.raw('DELETE FROM food WHERE id = ?', [id])
}


module.exports = {
  all: all,
  find: find,
  create: create,
  update: update,
  destroy: destroy
}
