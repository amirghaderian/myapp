import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE movies RESTART IDENTITY CASCADE");

  // Inserts seed entries
  await knex("movies").insert([
    {
      title: "The Shawshank Redemption",
      imdb_id: "tt0111161",
      genre: "Drama",
      year: 1994,
    },
    { title: "Fight Club", imdb_id: "tt0137523", genre: "Drama", year: 1999 },
    { title: "Forrest Gump", imdb_id: "tt0109830", genre: "Drama", year: 1994 },
    { title: "Inception", imdb_id: "tt1375666", genre: "Sci-Fi", year: 2010 },
    { title: "The Matrix", imdb_id: "tt0133093", genre: "Sci-Fi", year: 1999 },
    { title: "Goodfellas", imdb_id: "tt0099685", genre: "Crime", year: 1990 },
    {
      title: "Interstellar",
      imdb_id: "tt0816692",
      genre: "Sci-Fi",
      year: 2014,
    },
    { title: "Parasite", imdb_id: "tt6751668", genre: "Thriller", year: 2019 },
    {
      title: "Spirited Away",
      imdb_id: "tt0245429",
      genre: "Animation",
      year: 2001,
    },
    { title: "A Separation", imdb_id: "tt1832382", genre: "Drama", year: 2011 },
  ]);
}
