"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

export interface Users {
  id: string;
  name: string;
}
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState: Users[] = [];
export const fetchUsers = createAsyncThunk(
  "posts/fetchPosts",
  async (): Promise<Users[] | string> => {
    try {
      const response = await axios.get(USERS_URL);
      return [...response.data];
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      )
        return error.message;
      else return "something went error";
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload as Users[];
    });
  },
});

export const getAllUsers = (state: RootState) => state.users;

export default userSlice.reducer;
