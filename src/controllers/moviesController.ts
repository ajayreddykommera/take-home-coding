import { Request, Response } from "express";
import { fetchMoviesByYear } from "../services/movieService";
import { fetchMovieCredits } from "../services/creditsService";
import { Movie } from "../types";

interface MovieWithEditors extends Movie {
  editors: string[];
}

export const getMoviesByYear = async (req: Request, res: Response) => {
  const { year } = req.params;
  const page = Number(req.query.page) || 1;

  try {
    const movies = await fetchMoviesByYear(Number(year), page);
    const moviesWithCredits: MovieWithEditors[] = await Promise.all(
      movies.map(async (movie) => ({
        ...movie,
        editors: await fetchMovieCredits(movie.id),
      }))
    );

    res.json(moviesWithCredits);
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
