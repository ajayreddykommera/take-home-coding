import movieDBClient from "../utils/apiClient";
import { CrewMember } from "../types";

export const fetchMovieCredits = async (movieId: number): Promise<string[]> => {
  try {
    const response = await movieDBClient.get(`/movie/${movieId}/credits`);
    const editors = (response.data.crew as CrewMember[])
      .filter((person) => person.known_for_department === "Editing")
      .map((person) => person.name);
    return editors;
  } catch {
    return [];
  }
};
