
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert({ description: 'Watch Lord of the Rings', category: 'watch', user_id: 1}),
        knex('items').insert({ description: 'Watch Harry Potter', category: 'watch', user_id: 2}),
        knex('items').insert({ description: 'Catch up on Game of Thrones', category: 'watch', user_id: 3}),
        knex('items').insert({ description: 'Watch the new Thor', category: 'watch', user_id: 1}),
        knex('items').insert({ description: 'Checkout the Office', category: 'watch', user_id: 1}),
        knex('items').insert({ description: 'Watch Better Call Saul', category: 'watch', user_id: 2}),
        knex('items').insert({ description: 'See the Room', category: 'watch', user_id: 1}),
        knex('items').insert({ description: 'Watch Lord of the Rings', category: 'watch', user_id: 3}),
        knex('items').insert({ description: 'Read the Girl with the Dragon Tattoo', category: 'read', user_id: 1 }),
        knex('items').insert({ description: 'Scan the article on Trump', category: 'read', user_id: 2 }),
        knex('items').insert({ description: 'Read the new Stephen King novel', category: 'read', user_id: 3 }),
        knex('items').insert({ description: 'Read the latest Archie comic', category: 'read', user_id: 1 }),
        knex('items').insert({ description: 'Look through the Vancouver Sun', category: 'read', user_id: 1 }),
        knex('items').insert({ description: 'Read chapter three of the Psych textbook', category: 'read', user_id: 2 }),
        knex('items').insert({ description: 'Read a good jokebook', category: 'read', user_id: 1 }),
        knex('items').insert({ description: 'Read Lord of the Rings', category: 'read', user_id: 3 }),
        knex('items').insert({ description: 'Eat eggs benny', category: 'eat', user_id: 1 }),
        knex('items').insert({ description: 'Get brunch with Johnny', category: 'eat', user_id: 2 }),
        knex('items').insert({ description: 'Try the new sushi place next door', category: 'eat', user_id: 3 }),
        knex('items').insert({ description: 'Go for burgers', category: 'eat', user_id: 1 }),
        knex('items').insert({ description: 'Make a salad for lunch', category: 'eat', user_id: 1 }),
        knex('items').insert({ description: 'Meal prep for next week', category: 'eat', user_id: 2 }),
        knex('items').insert({ description: 'Meet friends for lunch', category: 'eat', user_id: 1 }),
        knex('items').insert({ description: 'Eat all of the hot dogs', category: 'eat', user_id: 3 }),
        knex('items').insert({ description: 'Get a new iPhone case', category: 'buy', user_id: 2 }),
        knex('items').insert({ description: 'Immersion blender', category: 'buy', user_id: 3 }),
        knex('items').insert({ description: 'Buy harry potter DVD collection', category: 'buy', user_id: 1 }),
        knex('items').insert({ description: 'Plant lightbulb', category: 'buy', user_id: 1 }),
        knex('items').insert({ description: 'Get 6m usb lightning cable', category: 'buy', user_id: 2 })
      ]);
    });
};
