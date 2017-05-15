exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_food RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [3, 1]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [2, 3]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [3, 3]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [2, 5]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [1, 6]
      ),
      knex.raw(
        'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)',
        [1, 4]
      )
    ]);
  });
};
