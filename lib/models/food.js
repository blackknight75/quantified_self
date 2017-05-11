const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function all() {
  return database.raw('SELECT * FROM food')
}

function find(id) {
  return database.raw('SELECT * FROM food WHERE id = ? LIMIT 1', [id])
}

function make(params) {
  return database.raw('INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING *', [params.name, params.calories, params.created_at, params.updated_at])
}

function change(params, id) {
  return database.raw('UPDATE food SET name=?, calories=? WHERE id = ? RETURNING *', [params.name, params.calories, id])
  .then((data) => {
    return data.rows
  });
}

function destroy(id) {
  return database.raw('DELETE FROM food WHERE id = ?', [id])
}


module.exports = {
  all: all,
  find: find,
  make: make,
  change: change,
  destroy: destroy
}
