exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_food RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [1, 1]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [2, 3]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [4, 3]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [6, 2]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [1, 2]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [4, 1]
      )
    ]);
  });
};
