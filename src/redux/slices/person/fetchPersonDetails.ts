import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { Person } from "./types";

type FetchPersonDetailsError = {
  message: string;
};

export const fetchPersonDetails = createAsyncThunk<
  Person,
  { id: string },
  { rejectValue: FetchPersonDetailsError }
>("person/fetchPersonDetails", async ({ id }, thunkApi) => {
  const response = await client.get(`tmdb/person/${id}`);

  if (response.status !== 200) {
    console.log("regected");
    return thunkApi.rejectWithValue({
      message: "Failed to fetch person details!",
    });
  }

  return response.data;
});
