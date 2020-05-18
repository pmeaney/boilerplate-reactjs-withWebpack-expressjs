
exports.up = function(knex) {
  return knex.schema
  .createTable('roles', function (table) {
    table.increments('role_id').primary();
    table.string('role_name');
  })
  .createTable('user_status', function (table) {
    table.increments('user_status_id').primary();
    table.string('user_status_name');
  })
  .createTable('users', function (table) {
    table.increments('user_id').primary()
    table.string('first_name');
    table.integer('role').references('roles.role_id');
    table.integer('status').references('user_status.user_status_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("users")
  .dropTable("user_status")
  .dropTable("roles")
};
