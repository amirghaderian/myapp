import express from "express";
import moviesRoutes from "./routes/movies.routes.js";
import { errorHandler, notFoundHandler } from "./utils/error-handler.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import "./db.js";
import { requireAuth } from "./middlewares/require-auth.js";
import docsRoutes from "./routes/docs.routes.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/docs", docsRoutes);
app.get("/", (_req, res) => {
  res.send("welcome");
});

app.use("/movies", requireAuth, moviesRoutes);

app.use("/auth", authRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
