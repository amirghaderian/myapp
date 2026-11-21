import express from "express";
import cookieParser from "cookie-parser";
import "./db.js";
import authRoutes from "./routes/auth.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import userMoviesRoutes from "./routes/user_movies.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import { requireAuth } from "./middlewares/require-auth.js";
import { errorHandler, notFoundHandler } from "./utils/error-handler.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("welcome");
});
app.use("/docs", docsRoutes);
app.use("/auth", authRoutes);
app.use("/movies", requireAuth, moviesRoutes);
app.use("/userMovies", userMoviesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
