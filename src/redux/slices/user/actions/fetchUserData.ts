import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { DbMedia, User } from "../types";

type ReturnType = {
  user: User;
  movies: DbMedia[];
  tv: DbMedia[];
};

export const fetchUserData = createAsyncThunk<ReturnType>(
  "user/fetchUser",
  async () => {
    try {
      const userRespone = await client.get(`user/me`);

      const moviesResponse = await client.get("user/movies");
      const tvResponse = await client.get("user/tv");

      const data: ReturnType = {
        user: userRespone.data,
        movies: moviesResponse.data,
        tv: tvResponse.data,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
