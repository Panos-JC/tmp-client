import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { MovieSearch, TvSearch } from "./types";

type Error = {
  message: string;
};

export const fetchSearchResults = createAsyncThunk<
  (MovieSearch | TvSearch)[],
  { query: string },
  { rejectValue: Error }
>("search/fetchSearchResults", async ({ query }, thunkApi) => {
  const response = await client.get(`tmdb/search?query=${query}`);

  if (response.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch person credits!",
    });
  }

  return response.data;
});
