exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ email: 'alice@alice.alice', password: 'alice'}),
        knex('users').insert({ email: 'bob@bob.bob', password: 'bob'}),
        knex('users').insert({ email: 'charlie@charlie.charlie', password: 'charlie'})
      ]);
    });
};
