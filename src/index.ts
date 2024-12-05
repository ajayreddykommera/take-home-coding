import express from "express";
import { getMoviesByYear } from "./controllers/moviesController";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/movies/:year", getMoviesByYear);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
