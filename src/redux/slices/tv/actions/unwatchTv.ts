import { createStandaloneToast } from "@chakra-ui/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { Tv } from "../types";
import { fetchTvData } from "./fetchTvData";

export const unwatchTv = createAsyncThunk<Tv, { tmdbId: string }>(
  "tv/unwatchTv",
  async ({ tmdbId }, thunkApi) => {
    const toast = createStandaloneToast();

    try {
      const response = await client.post("tv/unsee", { tmdbId });

      thunkApi.dispatch(fetchTvData({ page: 1 }));

      return response.data;
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
);
