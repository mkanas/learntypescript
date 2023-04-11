import PostList from "./GlobalRedux/Features/posts/PostList";
import AddForm from "./GlobalRedux/Features/posts/AddForm";

export default function Home() {
  return (
    <main className="p-10 flex justify-center h-screen ">
      <div>
        <h1 className="font-bold flex justify-center my-3 text-2xl">Posts</h1>
        <AddForm />
        <PostList />
      </div>
    </main>
  );
}
