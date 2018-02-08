exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'alice@alice.com', password: 'duckee'}),
        knex('users').insert({email: 'bob@bob.com', password: 'mouse'}),
        knex('users').insert({email: 'charlie@charlie.com', password: 'puppy_conglomeration'})
      ]);
    });
};
