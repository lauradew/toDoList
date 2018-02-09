exports.up = function (knex, Promise) {
    return knex.schema.createTable('items', function (table) {
        table.increments('id');
        table.string('description');
        table.string('category');
        table.integer('user_id').references('id').inTable('users')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('items');
};
