
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meal_food (
    id SERIAL PRIMARY KEY NOT NULL,
    food_id INTEGER,
    meal_id INTEGER
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meal_food`;
  return knex.raw(dropQuery);
};
