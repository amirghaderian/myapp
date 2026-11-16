import { Request, Response } from "express";
import { MovieFilters, MovieService } from "../services/movies.service.js";
import { type MovieInput } from "../services/movies.service.js";
import { toNumber, toText } from "../utils/parsers.js";

function parseMovieInput(body: unknown): MovieInput | null {
  const { title, imdb_id, genre, year } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const cleanTitle = toText(title);
  const cleanImdbId = toText(imdb_id);
  const cleanGenre = toText(genre);
  if (!cleanTitle || !cleanImdbId || !cleanGenre || typeof year !== "number") {
    return null;
  }

  return { title: cleanTitle, imdb_id: cleanImdbId, genre: cleanGenre, year };
}
export class MoviesController {
  constructor(private movieService: MovieService) {}
  getById = async (req: Request, res: Response) => {
    const movie = await this.movieService.findById(Number(req.params.id));
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  };
  getAllMovies = async (req: Request, res: Response) => {
    const { year, title, sort, limit } = req.query;
    const filters: MovieFilters = {
      year: toNumber(year),
      title: toText(title),
      sort: sort === "year" || sort === "id" ? sort : undefined,
      limit: toNumber(limit),
    };
    res.json(await this.movieService.findAll(filters));
  };
  createMovie = async (req: Request, res: Response) => {
    const input = parseMovieInput(req.body);
    if (!input) {
      res.status(400).json({
        message:
          "title, imdb_id, genre (string) and year (number) are required",
      });
      return;
    }
    const movie = await this.movieService.create(input);
    if (!movie) {
      res.status(409).json({ message: "This movie already exists" });
      return;
    }
    res.status(201).json(movie);
  };
  updateMovie = async (req: Request, res: Response) => {
    const input = parseMovieInput(req.body);
    if (!input) {
      res.status(400).json({
        message:
          "title, imdb_id, genre (string) and year (number) are required",
      });
      return;
    }
    const movie = await this.movieService.update(Number(req.params.id), input);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  };
  deleteMovie = async (req: Request, res: Response) => {
    console.log(req.params);
    const removed = await this.movieService.remove(Number(req.params.id));
    if (!removed) {
      res.status(404).json({ message: "Movie not found!" });
      return;
    }
    res.status(204).end();
  };
}
