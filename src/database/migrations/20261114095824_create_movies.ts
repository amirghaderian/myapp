import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("movies", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("imdb_id").notNullable().unique();
    table.string("genre").notNullable();
    table.integer("year");
    table.unique(["title", "year"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("movies");
}
