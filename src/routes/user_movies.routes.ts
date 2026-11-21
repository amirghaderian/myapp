import Router from "express";
import { UserMoviesService } from "../services/user_movies.service.js";
import { UserMoviesController } from "../controllers/user_movies.controller.js";
const router = Router();
const userMoviesService = new UserMoviesService();
const userMoviesController = new UserMoviesController(userMoviesService);

router.get("/", userMoviesController.myMovies);
export default router;
