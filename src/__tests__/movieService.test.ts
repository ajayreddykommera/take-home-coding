import { fetchMoviesByYear } from "../services/movieService";
import apiClient from "../utils/apiClient";

jest.mock("../utils/apiClient");

describe("fetchMoviesByYear", () => {
  it("should fetch movies by year", async () => {
    (
      apiClient.get as jest.MockedFunction<typeof apiClient.get>
    ).mockResolvedValue({
      data: {
        results: [
          {
            id: 1,
            title: "Test Movie",
            release_date: "2020-01-01",
            vote_average: 8.5,
          },
        ],
      },
    });

    const movies = await fetchMoviesByYear(2020);
    expect(movies).toEqual([
      {
        id: 1,
        title: "Test Movie",
        release_date: "2020-01-01",
        vote_average: 8.5,
      },
    ]);
  });

  it("should handle errors gracefully", async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error("API Error"));
    await expect(fetchMoviesByYear(2020)).rejects.toThrow(
      "Error fetching movies"
    );
  });
});

describe("fetchMoviesByYear", () => {
  it("should return an empty array if no movies are found", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { results: [] },
    });

    const result = await fetchMoviesByYear(2020);
    expect(result).toEqual([]);
  });
});

describe("fetchMoviesByYear", () => {
  it("should throw an error if the API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error("API error"));

    await expect(fetchMoviesByYear(2020)).rejects.toThrow(
      "Error fetching movies"
    );
  });
});

describe("fetchMoviesByYear", () => {
  it("should throw an error for invalid year input", async () => {
    await expect(fetchMoviesByYear("invalid" as any)).rejects.toThrow(
      "Year must be a valid number"
    );
  });
});
