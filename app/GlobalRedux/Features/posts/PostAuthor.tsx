"use client";

import { useSelector } from "react-redux";
import { getAllUsers } from "../users/userSlice";

interface PostAuthorProps {
  userId: string;
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const users = useSelector(getAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "Uknown Author"}</span>;
};

export default PostAuthor;
