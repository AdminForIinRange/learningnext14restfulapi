import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

// FETCH DATA WITH AN API

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {
  // FETCH DATA WITH API (RESTFUL API)
  const posts = await getData();

  // FETCH DATA WITHOUT API (SERVER ACTIONS)
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPage;
