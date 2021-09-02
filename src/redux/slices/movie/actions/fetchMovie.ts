import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { Credits, MovieDetails } from "../types";

type ReturnType = {
  movieData: MovieDetails;
  movieCredits: Credits;
};

type FetchMovieError = {
  message: string;
};

export const fetchMovie = createAsyncThunk<
  ReturnType,
  { id: string },
  { rejectValue: FetchMovieError }
>("movie/fetchMovie", async ({ id }, thunkApi) => {
  const detailsResponse = await client.get(`tmdb/movies/${id}`);

  if (detailsResponse.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch movie details!",
    });
  }

  const creditsResponse = await client.get(`tmdb/movies/${id}/credits`);

  if (creditsResponse.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch movie details!",
    });
  }

  const data: ReturnType = {
    movieData: detailsResponse.data,
    movieCredits: creditsResponse.data,
  };

  return data;
});
