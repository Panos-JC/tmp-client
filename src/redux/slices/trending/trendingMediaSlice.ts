import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../movie/types";
import { Tv } from "../tv/types";
import { fetchTrendingMovies } from "./fetchTrendingMovies";
import { fetchTrendingTv } from "./fetchTrendingTv";

interface TrendingMediaState {
  movies: Movie[];
  tv: Tv[];
  loading: boolean;
  error: string | null;
}

const initialState: TrendingMediaState = {
  movies: [],
  tv: [],
  loading: false,
  error: null,
};

export const trendingMediaSlice = createSlice({
  name: "trendingMedia",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrendingMovies.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchTrendingMovies.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.movies = payload;
    });

    builder.addCase(fetchTrendingMovies.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.loading = false;
    });

    builder.addCase(fetchTrendingTv.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchTrendingTv.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tv = payload;
    });

    builder.addCase(fetchTrendingTv.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.loading = false;
    });
  },
});

export default trendingMediaSlice.reducer;
