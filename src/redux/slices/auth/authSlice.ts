import { createSlice } from "@reduxjs/toolkit";
import { login } from "./login";
import { register } from "./register";
import { AuthUser } from "./types";

interface AuthState {
  authenticated: boolean;
  credentials: AuthUser;
  loading: boolean;
  error: string | string[] | null;
}

const initialState: AuthState = {
  authenticated: false,
  credentials: {} as AuthUser,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.authenticated = false;
      state.credentials = {} as AuthUser;
    },
  },
  extraReducers: builder => {
    // LOGIN
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.credentials = payload;
      state.authenticated = true;
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.error = payload.message;
      state.loading = false;
    });
    // REGISTER
    builder.addCase(register.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.credentials = payload;
      state.authenticated = true;
      state.loading = true;
    });

    builder.addCase(register.rejected, (state, { payload }) => {
      state.error = payload.messages;
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
