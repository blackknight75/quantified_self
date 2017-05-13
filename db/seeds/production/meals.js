exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO meals (category, diary_id) VALUES (?, ?)',
        ["Dinner", 1]
      ),
      knex.raw(
        'INSERT INTO meals (category, diary_id) VALUES (?, ?)',
        ["Lunch", 1]
      ),
      knex.raw(
        'INSERT INTO meals (category, diary_id) VALUES (?, ?)',
        ["Breakfast", 1]
      )
    ]);
  });
};
