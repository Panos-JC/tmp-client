import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { Movie } from "../movie/types";

type FetchTrendingError = {
  message: string;
};

export const fetchTrendingMovies = createAsyncThunk<
  Movie[],
  { timeWindow: string },
  { rejectValue: FetchTrendingError }
>("trendingMedia/fetchTrendingMovies", async ({ timeWindow }, thunkApi) => {
  const response = await client.get(
    `trending?mediaType=movie&timeWindow=${timeWindow}`
  );

  if (response.status !== 200) {
    console.log("rejected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch trending media!",
    });
  }

  return response.data.results;
});
