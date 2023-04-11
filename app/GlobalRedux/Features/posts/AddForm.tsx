"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { getAllUsers } from "../users/userSlice";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const handleOnSubmit = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
    }

    setTitle("");
    setContent("");
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h1 className="font-bold my-4">Add new Post</h1>
      <form className="flex flex-col ">
        <label htmlFor="title">Title</label>
        <input
          className="border-black border-2 rounded-md py-1 px-2"
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="content">Content</label>
        <textarea
          className="border-black border-2 rounded-md py-1 px-2"
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-center bg-green-400 my-2 border-black border-2 rounded-md">
          <button
            className="w-full font-bold"
            type="button"
            onClick={handleOnSubmit}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddForm;
