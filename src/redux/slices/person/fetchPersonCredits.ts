import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { PersonCredits } from "./types";

type FetchPersonCreditsError = {
  message: string;
};

export const fetchPersonCredits = createAsyncThunk<
  PersonCredits,
  { id: string },
  { rejectValue: FetchPersonCreditsError }
>("person/fetchPersonCredits", async ({ id }, thunkApi) => {
  const response = await client.get(`tmdb/person/${id}/credits`);

  if (response.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch person credits!",
    });
  }

  return response.data;
});
