exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE diaries RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO diaries (date, created_at, updated_at) VALUES (?, ?, ?)',
        ["2017-08-20", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO diaries (date, created_at, updated_at) VALUES (?, ?, ?)',
        ["2017-08-20", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO diaries (date, created_at, updated_at) VALUES (?, ?, ?)',
        ["2017-06-12", new Date, new Date]
      )
    ]);
  });
};
