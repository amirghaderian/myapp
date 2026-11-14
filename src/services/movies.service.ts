import { db } from "../db.js";
import { Movie } from "../models/movies.js";
export interface MovieFilters {
  year?: number;
  title?: string;
  sort?: "year" | "id";
  limit?: number;
}
export interface MovieInput {
  title: string;
  imdb_id: string;
  genre: string;
  year: number;
}
export class MovieService {
  private movies: Movie[] = [];
  async findAll(filters: MovieFilters): Promise<Movie[]> {
    let result = this.movies;
    const query = Movie.query();
    console.log(query);
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
  async create(data: MovieInput): Promise<Movie | null> {
    const duplicate = await Movie.query()
      .where("imdb_id", data.imdb_id)
      .orWhere({ title: data.title, year: data.year })
      .first();

    if (duplicate) {
      return null;
    }

    return await Movie.query().insert(data);
  }

  async update(id: number, data: MovieInput): Promise<Movie | undefined> {
    return await Movie.query().patchAndFetchById(id, data);
  }
}
