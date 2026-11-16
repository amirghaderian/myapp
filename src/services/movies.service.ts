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
  async findAll(filters: MovieFilters = {}): Promise<Movie[]> {
    const query = Movie.query();

    if (filters.title) {
      query.where("title", "ilike", `%${filters.title}%`);
    }
    if (filters.year !== undefined) {
      query.where("year", filters.year);
    }
    if (filters.sort) {
      query.orderBy(filters.sort);
    }
    if (filters.limit !== undefined) {
      query.limit(filters.limit);
    }
    return await query;
  }

  async findById(id: number): Promise<Movie | undefined> {
    return await Movie.query().findById(id);
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

  async remove(id: number): Promise<boolean> {
    const deletedCount = await Movie.query().deleteById(id);
    return deletedCount > 0;
  }
}
