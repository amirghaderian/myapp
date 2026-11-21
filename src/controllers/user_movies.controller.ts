import { Request, Response } from "express";
import { UserMoviesService } from "../services/user_movies.service.js";
import { toNumber } from "../utils/parsers.js";

export class UserMoviesController {
  constructor(private user_movies: UserMoviesService) {}
  myMovies = async (req: Request, res: Response) => {
    res.json(await this.user_movies.findMine(2));
  };
  addMovie = async (req: Request, res: Response) => {
    const { user_id, movies_id, review, is_favorite } = req.body;
    if (!toNumber(user_id) || !toNumber(movies_id)) {
      res.status(400).json({
        message: "user_id and movies_id is required and must be number",
      });
    }
    if (user_id) {
    
    }
    const payload = {
      user_id,
      movies_id,
      review: review ?? "",
      is_favorite: is_favorite ?? false,
    };
    this.user_movies.addMovie(payload);
  };
}
