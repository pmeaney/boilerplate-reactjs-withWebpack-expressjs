
/**
 * migrationExample_foreignKeyIsString_uniqueAsPK.js
 * table users references "role_name" in roles and
 * "user_status_name" in user_status.
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('roles', function (table) {
    table.increments('role_id').primary();
    table.string('role_name');
    table.unique('role_name');
  })
  .createTable('user_status', function (table) {
    table.increments('user_status_id').primary();
    table.string('user_status_name');
    table.unique('user_status_name');
  })
  .createTable('users', function (table) {
    table.increments('user_id').primary()
    table.string('first_name');
    table.string('role').references('roles.role_name');
    table.string('status').references('user_status.user_status_name');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("users")
  .dropTable("user_status")
  .dropTable("roles")
};
