import { Imovie, MovieFilters } from "../types/movies.js";
import { db } from "../db.js";
export class MovieService {
  private movies: Imovie[] = [
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "Fight Club", year: 1999 },
    { id: 3, title: "Interstellar", year: 2014 },
  ];
  async findAll(filters: MovieFilters): Promise<Imovie[]> {
    let result = this.movies;
    const query = await db("movies").select("*");
    if (filters.title) {
      const search = filters.title.toLowerCase();
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(search),
      );
    }
    if (filters.year) {
      result = result.filter((movie) => movie.year === filters.year);
    }
    if (filters.sort) {
      if (filters.sort === "year") {
        result = [...result].sort((a, b) => a.year - b.year);
      }
      if (filters.sort === "id") {
        result = [...result].sort((a, b) => a.id - b.id);
      }
    }
    if (filters.limit !== undefined) {
      result = result.slice(0, filters.limit);
    }
    return query;
  }
  findById(id: number): Imovie | undefined {
    return this.movies.find((movie) => movie.id === id);
  }
  remove(id: number): boolean {
    const removeIndex = this.movies.findIndex((movie) => movie.id === id);
    if (removeIndex === -1) {
      return false;
    }
    this.movies.splice(removeIndex, 1);
    return true;
  }
}
