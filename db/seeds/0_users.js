
const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: 1, email: 'alice@alice.alice', password: bcrypt.hashSync('alice', 10)}),
        knex('users').insert({ id: 2, email: 'bob@bob.bob', password: bcrypt.hashSync('bob', 10)}),
        knex('users').insert({ id: 3, email: 'charlie@charlie.charlie', password: bcrypt.hashSync('charlie', 10)})
      ]);
    });
};
