import { Model } from "objection";

export class Movie extends Model {
  static tableName = "movies";

  id!: number;
  title!: string;
  imdb_id!: string;
  genre!: string;
  year!: number | null;
}
