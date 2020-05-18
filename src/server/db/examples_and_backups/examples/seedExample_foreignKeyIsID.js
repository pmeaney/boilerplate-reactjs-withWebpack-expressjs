exports.seed = async function (knex) {
  try {

    await knex('roles').del();
    await knex('user_status').del();
    await knex('users').del();


    await knex("roles").insert([
      {
        role_id: 1,
        role_name: "admin",
      },
      {
        role_id: 2,
        role_name: "dev",
      },
      {
        role_id: 3,
        role_name: "qc",
      },
      {
        role_id: 4,
        role_name: "ba",
      },
    ]);

    await knex("user_status").insert([
      {
        user_status_id: 1,
        user_status_name: "active",
      },
      {
        user_status_id: 2,
        user_status_name: "disabled",
      }
    ]);

    await knex("users").insert({
      first_name: "Hoang",
      role: 1,
      status: 1
    });
    
  } catch (err) {
    console.error(err);
  }
};