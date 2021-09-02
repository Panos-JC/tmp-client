import { createStandaloneToast } from "@chakra-ui/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../../api/client";
import { Tv } from "../types";
import { fetchTvData } from "./fetchTvData";

type Params = {
  tmdbId: string;
  title: string;
  posterPath: string;
};

export const watchTv = createAsyncThunk<Tv, { params: Params }>(
  "tv/watchTv",
  async ({ params }, thunkApi) => {
    const toast = createStandaloneToast();

    try {
      const response = await client.post(`tv/see`, params);

      thunkApi.dispatch(fetchTvData({ page: 1 }));

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
