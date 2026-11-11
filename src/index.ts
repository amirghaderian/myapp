import express, { NextFunction, Request, Response } from "express";
import Movies from "./routes/movies.routes.js";
const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to this express course! with  a.ghaderian");
});
app.use("/movies", Movies);
app.use((_req, res) => {
  res.status(404).json({ message: "Route not Found" });
});
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`app is listen to port ${port}`);
});
