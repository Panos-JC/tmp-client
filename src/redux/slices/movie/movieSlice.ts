import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchMovie } from "./actions/fetchMovie";
import { fetchMovieData } from "./actions/fetchMovieData";
import { see } from "./actions/see";
import { unsee } from "./actions/unsee";
import { Credits, initialMovieDetails, Movie, MovieDetails } from "./types";

interface MovieState {
  movies: { popularMovies: Movie[]; topRatedMovies: Movie[]; loading: boolean };
  movieDetails: {
    movieData: MovieDetails;
    movieCredits: Credits;
    loading: boolean;
  };
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: { popularMovies: [], topRatedMovies: [], loading: false },
  movieDetails: {
    movieData: initialMovieDetails,
    movieCredits: { id: 0, cast: [], crew: [] },
    loading: false,
  },
  loading: false,
  error: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
    // Fetch movie data
    builder.addCase(fetchMovieData.pending, state => {
      state.movies.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMovieData.fulfilled, (state, { payload }) => {
      state.movies.loading = false;
      state.movies.popularMovies = payload.popularMovies;
      state.movies.topRatedMovies = payload.topRatedMovies;
    });
    builder.addCase(fetchMovieData.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.movies.loading = false;
    });

    // Fetch single movie details
    builder.addCase(fetchMovie.pending, state => {
      state.movieDetails.loading = true;
      state.error = null;
    });

    builder.addCase(fetchMovie.fulfilled, (state, { payload }) => {
      state.movieDetails.movieCredits = payload.movieCredits;
      state.movieDetails.movieData = payload.movieData;
      state.movieDetails.loading = false;
    });

    builder.addCase(fetchMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.movieDetails.loading = false;
    });

    // See movie
    builder.addCase(see.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(see.fulfilled, state => {
      state.loading = false;
    });

    // Unsee movie
    builder.addCase(unsee.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(unsee.fulfilled, state => {
      state.loading = false;
    });

    builder.addCase(unsee.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.loading = false;
    });
  },
});

export default movieSlice.reducer;
