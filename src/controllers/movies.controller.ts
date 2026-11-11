import { Request, Response } from "express";
import { MovieService } from "../services/movies.service.js";
import { MovieFilters } from "../types/movies.js";

export class MoviesController {
  constructor(private movieService: MovieService) {}
  getById = (req: Request, res: Response) => {
    const movie = this.movieService.findById(Number(req.params.id));
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  };
  getAllMovies = async (req: Request, res: Response) => {
    const { year, title, sort, limit } = req.query;
    const filters: MovieFilters = {
      year: year !== undefined ? Number(year) : undefined,
      title: title !== undefined ? String(title) : undefined,
      sort: sort === "year" || sort === "id" ? sort : undefined,
      limit: limit !== undefined ? Number(limit) : undefined,
    };
    res.json(await this.movieService.findAll(filters));
  };
  deleteMovie = (req: Request, res: Response) => {
    const removed = this.movieService.remove(Number(req.params.id));
    if (!removed) {
      res.status(404).json({ message: "Movie not found!" });
      return;
    }
    res.status(204).end();
  };
}
