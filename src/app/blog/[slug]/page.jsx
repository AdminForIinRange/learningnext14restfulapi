import Image from "next/image";
import React, { Suspense } from "react";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/PostUser";
import { getPost } from "@/lib/data";
const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};
export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  // using params, slug is passed as a parameter its a buit in function in nextjs

  const { slug } = params;
  const post = await getData(slug);

  // const post = await getPost(slug); //passing slug as a parameter in side getdata, slug's raw value is /blog/[slug]

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
      {post?.img &&  <Image
          src={post?.img}
          alt=""
          fill
          className={styles.img}
        />}
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}> {post?.title} </h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}

          {/*  passing userId from  `https://jsonplaceholder.typicode.com/posts/` allowing me to access a single post from the api */}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>aUTHOR</span>
            <span className={styles.detailValue}>detailValue</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
