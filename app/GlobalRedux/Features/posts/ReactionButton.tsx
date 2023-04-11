"use client";

import { useDispatch } from "react-redux";
import { reactionsAdded } from "./postsSlice";
import { Posts } from "./postsSlice";

const reactionsEmoji = {
  thumbsup: "👍",
  wow: "😮",
  heart: "❤",
  rocket: "🚀",
  coffee: "☕",
};

import React from "react";

const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionsEmoji).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className=""
          onClick={() => {
            dispatch(
              reactionsAdded({
                postId: post.id,
                reaction: name as keyof Posts["reactions"],
              })
            );
          }}
        >
          {emoji}
          {post.reactions[name]}
        </button>
      );
    }
  );
  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
