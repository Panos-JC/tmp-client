import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { Movie } from "../types";
import { fetchMovieData } from "./fetchMovieData";

type UnseeMovieError = {
  message: string;
};

export const unsee = createAsyncThunk<
  Movie,
  { tmdbId: string },
  { rejectValue: UnseeMovieError }
>("movie/unsee", async ({ tmdbId }, thunkApi) => {
  const response = await client.post(`movie/unsee`, { tmdbId });

  if (response.status !== 201) {
    console.log("rejected");
    return thunkApi.rejectWithValue({
      message: "Failed to unsee movie",
    });
  }

  thunkApi.dispatch(fetchMovieData({ page: 1 }));

  return response.data;
});
