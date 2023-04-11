"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Users {
  id: string;
  name: string;
}

const initialState: Users[] = [
  { id: "0", name: "ricardo" },
  { id: "1", name: "richard" },
  { id: "2", name: "ridisk" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const getAllUsers = (state: RootState) => state.users;

export default userSlice.reducer;
