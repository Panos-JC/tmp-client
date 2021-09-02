import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./actions/fetchUserData";
import { DbMedia, User } from "./types";

interface UserState {
  credentials: User;
  movies: DbMedia[];
  tv: DbMedia[];
  loading: boolean;
}

const initialState: UserState = {
  credentials: {
    id: 0,
    email: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    movieCount: 0,
    tvCount: 0,
  },
  movies: [],
  tv: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserData.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.credentials = payload.user;
      state.movies = payload.movies;
      state.tv = payload.tv;
      state.loading = false;
    });

    builder.addCase(fetchUserData.rejected, state => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
