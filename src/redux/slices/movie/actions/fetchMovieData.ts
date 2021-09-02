import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { Movie } from "../types";

type ReturnType = {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
};

type FetchMovieDataError = {
  message: string;
};

export const fetchMovieData = createAsyncThunk<
  ReturnType,
  { page: number },
  { rejectValue: FetchMovieDataError }
>("movie/fetchMovieData", async ({ page }, thunkApi) => {
  // Get popular movies
  const popularMoviesResponse = await client.get(
    `tmdb/movies?type=popular&page=${page}`
  );

  if (popularMoviesResponse.status !== 200) {
    console.log("rejected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch popular movies!",
    });
  }

  // Get top rated movies
  const topRatedMoviesResponse = await client.get(
    `tmdb/movies?type=top_rated&page=${page}`
  );

  if (topRatedMoviesResponse.status !== 200) {
    console.log("rejected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch top rated movies!",
    });
  }

  const data: ReturnType = {
    popularMovies: popularMoviesResponse.data,
    topRatedMovies: topRatedMoviesResponse.data,
  };

  return data;
});
