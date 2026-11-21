import { Request, Response } from "express";
import { UserMoviesService } from "../services/user_movies.service.js";
import { toNumber } from "../utils/parsers.js";

export class UserMoviesController {
  constructor(private user_movies: UserMoviesService) {}
  myMovies = async (req: Request, res: Response) => {
    res.json(await this.user_movies.findMine(1));
  };
  addMovie = async (req: Request, res: Response) => {
    const { user_id, movie_id, review, is_favorite } = req.body;
    if (
      typeof user_id !== "number" ||
      typeof movie_id !== "number" ||
      !user_id ||
      !movie_id
    ) {
      res.status(400).json({
        message: "user_id and movies_id is required and must be number",
      });
    }
    if (user_id) {
    }
    const payload = {
      user_id,
      movie_id,
      review: review ?? "",
      is_favorite: is_favorite ?? false,
    };
    const movie = this.user_movies.addMovie(payload);
    
    res.status(201).json(movie);
  };
}
