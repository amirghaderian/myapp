import { Movie } from "../models/movie.model.js";
import { User } from "../models/user.model.js";
import { UserMovie } from "../models/user_movie.js";
interface IInput {
  user_id: number;
  movie_id: number;
  review: string;
  is_favorite: boolean;
}
export class UserMoviesService {
  async findMine(userId: number, onlyFavorites = false): Promise<UserMovie[]> {
    const query = UserMovie.query()
      .where("user_id", userId)
      .withGraphFetched("movie");
    if (onlyFavorites) {
      query.where("is_favorite", true);
    }
    return await query;
  }
  async addMovie(
    data: IInput,
  ): Promise<UserMovie | { ok: boolean; result: string }> {
    const query = UserMovie.query();

    const findMoviesQuery = await Movie.query().findById(data.movie_id).first();
    const FindUsersQuery = await User.query().findById(data.user_id).first();
    if (!findMoviesQuery) {
      return { ok: false, result: "the movie_id isnt exist" };
    }
    if (!FindUsersQuery) {
      return { ok: false, result: "the user_id isnt exist" };
    }
    const duplicate = await query
      .where("user_id", data.user_id)
      .where("movie_id", data.movie_id)
      .first();
    if (duplicate) {
      return { ok: false, result: "This user already has this movie" };
    }
    return duplicate ? duplicate : await query.insert(data);
  }
}
