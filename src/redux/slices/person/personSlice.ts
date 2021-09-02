import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchPersonCredits } from "./fetchPersonCredits";
import { fetchPersonDetails } from "./fetchPersonDetails";
import { Person, PersonCredits } from "./types";

interface PersonState {
  personDetails: Person;
  personCredits: PersonCredits;
  loading: boolean;
  error: string | null;
}

const initialState: PersonState = {
  personDetails: {} as Person,
  personCredits: {} as PersonCredits,
  loading: false,
  error: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });

    // Fetch person details
    builder.addCase(fetchPersonDetails.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchPersonDetails.fulfilled, (state, { payload }) => {
      state.personDetails = payload;
      state.loading = false;
    });

    builder.addCase(fetchPersonDetails.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.loading = false;
    });

    // Fetch person credits
    builder.addCase(fetchPersonCredits.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchPersonCredits.fulfilled, (state, { payload }) => {
      state.personCredits = payload;
      state.loading = false;
    });

    builder.addCase(fetchPersonCredits.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.loading = false;
    });
  },
});

export default personSlice.reducer;
