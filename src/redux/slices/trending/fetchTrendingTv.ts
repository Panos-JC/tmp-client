import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { Tv } from "../tv/types";

type FetchTrendingError = {
  message: string;
};

export const fetchTrendingTv = createAsyncThunk<
  Tv[],
  { timeWindow: string },
  { rejectValue: FetchTrendingError }
>("trendingMedia/fetchTrendingTv", async ({ timeWindow }, thunkApi) => {
  const response = await client.get(
    `trending?mediaType=tv&timeWindow=${timeWindow}`
  );

  if (response.status !== 200) {
    console.log("rejected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch trending media!",
    });
  }

  return response.data.results;
});
