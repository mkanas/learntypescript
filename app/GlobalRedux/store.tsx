"use client";

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Features/posts/postsSlice";
import usersReducer from "./Features/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispacth = typeof store.dispatch;
