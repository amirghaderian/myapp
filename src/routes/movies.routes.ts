import { Router } from "express";
import { MoviesController } from "../controllers/movies.controller.js";
import { MoviesService } from "../services/movies.service.js";

const moviesService = new MoviesService();
const moviesController = new MoviesController(moviesService);

const router = Router();
router.get("/", moviesController.getAll);
router.get("/:id", moviesController.getById);
router.post("/", moviesController.create);
router.put("/:id", moviesController.update);
router.delete("/:id", moviesController.remove);
export default router;
