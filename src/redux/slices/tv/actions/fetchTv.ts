import { createStandaloneToast } from "@chakra-ui/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { TvCredits, TvDetails } from "../types";

type ReturnType = {
  tvData: TvDetails;
  tvCredits: TvCredits;
};

type FetchMovieError = {
  message: string;
};

export const fetchTv = createAsyncThunk<
  ReturnType,
  { id: string },
  { rejectValue: FetchMovieError }
>("tv/fetchTv", async ({ id }, thunkApi) => {
  const detailsResponse = await client.get(`tmdb/tv/${id}`);

  if (detailsResponse.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch movie details!",
    });
  }

  const creditsResponse = await client.get(`tmdb/tv/${id}/credits`);

  if (creditsResponse.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch movie details!",
    });
  }

  const data: ReturnType = {
    tvData: detailsResponse.data,
    tvCredits: creditsResponse.data,
  };

  return data;
});
