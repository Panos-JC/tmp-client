import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { fetchMovieData } from "./fetchMovieData";
import { Movie } from "../types";
import { createStandaloneToast } from "@chakra-ui/react";

type Params = {
  tmdbId: string;
  title: string;
  posterPath: string;
};

export const see = createAsyncThunk<Movie, { params: Params }>(
  "movie/see",
  async ({ params }, thunkApi) => {
    const toast = createStandaloneToast();

    try {
      const response = await client.post(`movie/see`, params);

      thunkApi.dispatch(fetchMovieData({ page: 1 }));

      return response.data;
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  }
);
