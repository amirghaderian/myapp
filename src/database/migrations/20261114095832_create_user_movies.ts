import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user_movies", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .references("users.id")
      .notNullable()
      .onDelete("cascade");
    table
      .integer("movie_id")
      .references("movies.id")
      .notNullable()
      .onDelete("cascade");
    table.text("review");
    table.boolean("is_favorite").defaultTo(false);
    table.unique(["user_id", "movie_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user_movies");
}
