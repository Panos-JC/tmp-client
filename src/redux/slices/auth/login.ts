import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { AuthUser } from "./types";

type LoginError = {
  message: string;
};

export const login = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: LoginError }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await client.post("auth/login", { email, password });

    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data.user;
  } catch (error) {
    console.log(error);
    return rejectWithValue({
      message: "Failed to login",
    });
  }
});
