import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("name");
    table.string("last_name");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}