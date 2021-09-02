import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { Tv } from "../types";

type ReturnType = {
  popularTv: Tv[];
  topRatedTv: Tv[];
};

type FetchTvDataError = {
  message: string;
};

export const fetchTvData = createAsyncThunk<
  ReturnType,
  { page: number },
  { rejectValue: FetchTvDataError }
>("tv/fetchTvData", async ({ page }, thunkApi) => {
  // Get popular tv
  const popularTvRes = await client.get(`tmdb/tv?type=popular&page=${page}`);

  if (popularTvRes.status !== 200) {
    // TODO: handle error with redux
    console.log("rejected");
  }

  // Get top rated tv
  const topRatedTvRes = await client.get(`tmdb/tv?type=top_rated&page=${page}`);

  if (topRatedTvRes.status !== 200) {
    // TODO: handle error with redux
    console.log("rejected");
  }

  const data: ReturnType = {
    popularTv: popularTvRes.data,
    topRatedTv: topRatedTvRes.data,
  };

  return data;
});
