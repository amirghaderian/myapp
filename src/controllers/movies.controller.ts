import type { Request, Response } from "express";
import { MoviesService, type MovieFilters, type MovieInput } from "../services/movies.service.js";
import { toNonEmptyString, toNumber } from "../utils/parsers.js";

function parseMovieInput(body: unknown): MovieInput | null {
  const { title, imdb_id, genre, year } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const cleanTitle = toNonEmptyString(title);
  const cleanImdbId = toNonEmptyString(imdb_id);
  const cleanGenre = toNonEmptyString(genre);
  if (!cleanTitle || !cleanImdbId || !cleanGenre || typeof year !== "number") {
    return null;
  }

  return { title: cleanTitle, imdb_id: cleanImdbId, genre: cleanGenre, year };
}
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  getById = async (req: Request, res: Response) => {
    const movie = await this.moviesService.findById(Number(req.params.id));
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  };
  getAll = async (req: Request, res: Response) => {
    const { year, title, sort, limit } = req.query;
    const filters: MovieFilters = {
      year: toNumber(year),
      title: toNonEmptyString(title),
      sort: sort === "year" || sort === "id" ? sort : undefined,
      limit: toNumber(limit),
    };
    res.json(await this.moviesService.findAll(filters));
  };
  create = async (req: Request, res: Response) => {
    const input = parseMovieInput(req.body);
    if (!input) {
      res.status(400).json({
        message:
          "Title, imdb_id, genre (string) and year (number) are required",
      });
      return;
    }
    const movie = await this.moviesService.create(input);
    if (!movie) {
      res.status(409).json({ message: "This movie already exists" });
      return;
    }
    res.status(201).json(movie);
  };
  update = async (req: Request, res: Response) => {
    const input = parseMovieInput(req.body);
    if (!input) {
      res.status(400).json({
        message:
          "Title, imdb_id, genre (string) and year (number) are required",
      });
      return;
    }
    const movie = await this.moviesService.update(Number(req.params.id), input);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  };
  remove = async (req: Request, res: Response) => {
    const removed = await this.moviesService.remove(Number(req.params.id));
    if (!removed) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(204).end();
  };
}
