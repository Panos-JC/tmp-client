import { createSlice } from "@reduxjs/toolkit";
import { fetchTv } from "./actions/fetchTv";
import { fetchTvData } from "./actions/fetchTvData";
import { initialTvDetails, Tv, TvCredits, TvDetails } from "./types";

interface TvState {
  tv: { popularTv: Tv[]; topRatedTv: Tv[]; loading: boolean };
  tvDetails: {
    tvData: TvDetails;
    tvCredits: TvCredits;
    loading: boolean;
  };
  loading: boolean;
}

const initialState: TvState = {
  tv: {
    popularTv: [],
    topRatedTv: [],
    loading: true,
  },
  tvDetails: {
    tvData: initialTvDetails,
    tvCredits: { id: 0, cast: [], crew: [] },
    loading: false,
  },
  loading: false,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch tv data
    builder.addCase(fetchTvData.pending, state => {
      state.tv.loading = true;
    });

    builder.addCase(fetchTvData.fulfilled, (state, { payload }) => {
      state.tv.popularTv = payload.popularTv;
      state.tv.topRatedTv = payload.topRatedTv;
      state.tv.loading = false;
    });

    builder.addCase(fetchTvData.rejected, state => {
      state.tv.loading = false;
    });

    // Fetch single tv show details
    builder.addCase(fetchTv.pending, state => {
      state.tvDetails.loading = true;
    });

    builder.addCase(fetchTv.fulfilled, (state, { payload }) => {
      state.tvDetails.tvData = payload.tvData;
      state.tvDetails.tvCredits = payload.tvCredits;
      state.tvDetails.loading = false;
    });

    builder.addCase(fetchTv.rejected, state => {
      state.tvDetails.loading = false;
    });
  },
});

export default tvSlice.reducer;
