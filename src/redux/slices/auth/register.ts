import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { AuthUser } from "./types";

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

type RegisterError = {
  messages: string[];
};

export const register = createAsyncThunk<
  AuthUser,
  RegisterParams,
  { rejectValue: RegisterError }
>(
  "auth/register",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const response = await client.post("auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
      return rejectWithValue({ messages: error.response.data.message });
    }
  }
);
