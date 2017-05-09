
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE food (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE food`;
  return knex.raw(dropQuery);
};
