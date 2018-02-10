exports.up = function (knex, Promise) {
    return knex.schema.createTable('resources', function (table) {
        table.increments('id');
        table.string('link');
        table.integer('item_id').references('id').inTable('items')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('resources');
};
