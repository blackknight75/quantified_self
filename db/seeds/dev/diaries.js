exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE diary RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO diary (date, created_at, updated_at) VALUES (?, ?, ?)',
        ["2017-08-20", 100, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO diary (date, created_at, updated_at) VALUES (?, ?, ?)',
        ["2017-08-20", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO diary (date, created_at, updated_at) VALUES (?, ?, ?)',
        ["2017-06-12", 500, new Date, new Date]
      )
    ]);
  });
};
