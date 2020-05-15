
exports.up = async function(knex) {
   await  knex.schema.createTable("users", (table) => {
      table.increments("id"),
      table.text("username").notNull().unique(),
      table.text("email").notNull().unique(),
      table.text("address").default(null)
   })
  
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
