import { Model } from "objection";
import { Movie } from "./movie.model.js";

export class UserMovie extends Model {
  static tableName = "user_movies";

  id!: number;
  user_id!: number;
  movie_id!: number;
  review!: string;
  is_favorite!: boolean;
  movie!: Movie;
  static relationMappings = () => ({
    movie: {
      relation: Model.BelongsToOneRelation,
      modelClass: Movie,
      join: {
        from: "user_movies.movie_id",
        to: "movies.id",
      },
    },
  });
}
