exports.seed = async function (knex) {
  try {

    await knex('roles').del();
    await knex('user_status').del();
    await knex('users').del();


    await knex("roles").insert([
      {
        role_name: "admin",
      },
      {
        role_name: "dev",
      },
      {
        role_name: "qc",
      },
      {
        role_name: "ba",
      },
    ]);

    await knex("user_status").insert([
      {
        user_status_name: "active",
      },
      {
        user_status_name: "disabled",
      }
    ]);

    await knex("users").insert({
      first_name: "Hoang",
      role: "admin",
      status: "active"
    });
    
  } catch (err) {
    console.error(err);
  }
};