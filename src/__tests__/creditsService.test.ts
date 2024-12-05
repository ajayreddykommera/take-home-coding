import { fetchMovieCredits } from "../services/creditsService";
import apiClient from "../utils/apiClient";

jest.mock("../utils/apiClient");

describe("fetchMovieCredits", () => {
  it("should fetch and return editors names", async () => {
    const mockResponse = {
      data: {
        crew: [
          { name: "Editor 1", known_for_department: "Editing" },
          { name: "Director", known_for_department: "Directing" },
          { name: "Editor 2", known_for_department: "Editing" },
        ],
      },
    };
    (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchMovieCredits(1);

    expect(result).toEqual(["Editor 1", "Editor 2"]);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/1/credits");
  });

  it("should return an empty array when there are no editors in the crew", async () => {
    const mockResponse = {
      data: {
        crew: [
          { name: "Director 1", known_for_department: "Directing" },
          { name: "Producer", known_for_department: "Production" },
        ],
      },
    };
    (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchMovieCredits(1);

    expect(result).toEqual([]);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/1/credits");
  });

  it("should return an empty array if the API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error("API error"));

    const result = await fetchMovieCredits(1);

    expect(result).toEqual([]);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/1/credits");
  });

  it("should return an empty array when the crew data is empty", async () => {
    const mockResponse = {
      data: {
        crew: [],
      },
    };
    (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchMovieCredits(1);

    expect(result).toEqual([]);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/1/credits");
  });
});
