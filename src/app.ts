import express from "express";
import moviesRoutes from "./routes/movies.routes.js";
import { errorHandler, notFoundHandler } from "./utils/error-handler.js";
import "./db.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to this express course! with  a.ghaderian");
});
app.use("/movies", moviesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
