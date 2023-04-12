"use client";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { PostsFake } from "./postsSlice";

const PostExcerpt = ({ post }: { post: PostsFake }) => {
  return (
    <article className="border-2 border-black rounded-md my-4 py-2 px-3">
      <h1 className="font-bold text-lg"> {post.title}</h1>
      <p>{post.body.substring(0, 100)}</p>

      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButton post={post} />
      </p>
    </article>
  );
};

export default PostExcerpt;
