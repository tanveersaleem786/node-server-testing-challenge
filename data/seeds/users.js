
exports.seed = async function(knex) {  
  
    await knex("users").truncate()
    await knex("users").insert([
      {id: 1, username: 'tanveer', email: "tanver@gmail.com", address: "xyz address"},
      {id: 2, username: 'naveed', email: "naveed@gmail.com", address: "qrt address"},
      {id: 3, username: 'basit', email: "basit@gmail.com", address: "kkk address"},
      {id: 4, username: 'sohail', email: "sohail@gmail.com", address: "sanda address"},
    ])
};
