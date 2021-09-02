import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchSearchResults } from "./fetchSearchResults";
import { MovieSearch, TvSearch } from "./types";

interface SearchState {
  media: (MovieSearch | TvSearch)[];
  loading: boolean;
}

const initialState: SearchState = {
  media: [],
  loading: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });

    builder.addCase(fetchSearchResults.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchSearchResults.fulfilled, (state, { payload }) => {
      state.media = payload;
      state.loading = false;
    });
  },
});

export default searchSlice.reducer;
