
exports.up = function(knex) {
  // don't forget the return statement
  return knex.schema.createTable('cars', table => {
    table.increments();
    table.text('vin', 20).unique().notNullable();
    table.text('make', 32).notNullable();
    table.text('model', 32).notNullable();
    table.decimal('mileage').notNullable();
    table.text('transmission_type');
    table.text('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
