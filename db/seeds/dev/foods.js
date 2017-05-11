exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE food RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Banana", 100, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Apple", 50, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO food (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Steak", 500, new Date, new Date]
      )
    ]);
  });
};
