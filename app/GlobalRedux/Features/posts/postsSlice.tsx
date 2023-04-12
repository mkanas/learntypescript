"use client";

import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { sub } from "date-fns";

export interface PostsFake {
  id: number;
  title: string;
  body: string;
  userId: string;
  date: string;
}

export interface Posts {
  id: string;
  api: PostsFake[];
  date: string;
  error: string;
  reactions: {
    thumbsup: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface InitialState {
  posts: Posts[];
  status: "idle" | "succeeded" | "failed" | "loading";
  error: null | string | undefined;
}

const initialState: InitialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (): Promise<Posts[] | string> => {
    try {
      const response = await axios.get(POSTS_URL);
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Posts>) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId): { payload: Posts } {
        return {
          payload: {
            api: [
              {
                id: nanoid(),
                title,
                body: content,
                userId,
              },
            ],
            error: "",
            date: new Date().toISOString(),
            reactions: {
              thumbsup: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionsAdded(
      state,
      action: PayloadAction<{
        postId: string;
        reaction: keyof Posts["reactions"];
      }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //adding date and reactions
        let min = 1;
        const loadedPosts = (action.payload as Posts[]).map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsup: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        //Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postAdded, reactionsAdded } = postsSlice.actions;

export default postsSlice.reducer;
