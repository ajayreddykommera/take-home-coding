import movieDBClient from "../utils/apiClient";
import { Movie } from "../types";
import { AxiosError } from "axios";

export const fetchMoviesByYear = async (
  year: number,
  page: number = 1
): Promise<Movie[]> => {
  if (typeof year !== "number" || isNaN(year) || year <= 0) {
    throw new Error("Year must be a valid number");
  }

  try {
    const response = await movieDBClient.get("/discover/movie", {
      params: {
        language: "en-US",
        page,
        primary_release_year: year,
        sort_by: "popularity.desc",
      },
    });

    if (!response.data || !response.data.results) {
      throw new Error("No movies found");
    }

    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        throw new Error(
          `Error fetching movies: ${
            error.response.data.status_message || error.message
          }`
        );
      } else {
        throw new Error("Error fetching movies");
      }
    } else if (error instanceof Error) {
      throw new Error("Error fetching movies");
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
