This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Notes.md from Next.js (Update and Format Every Day until Project is complete)

# Read these Notes if need be

```js
// It's very important to follow proper Next.js naming conventions; otherwise, Next.js may not compile correctly, and you may run into unwanted performance issues.

// If you run into any issues, remember to restart your development server and review the names and issues.
```

```JS

// If you ever get stuck on hydration, watch Timestamp 01:58

// "use client";
import Image from "next/image";
import styles from "./contact.module.css";
// import dynamic from "next/dynamic";
// import HydrationTest from "@/components/hydrationTest";

// const HydrationTestNoSSR = dynamic(()=>import("@/components/hydrationTest"), {ssr: false})

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = () => {
  // const a = Math.random();

  // console.log(a);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR/> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;


```

```JS




// It's like using Navigate("/Auth") in React via react-router-dom, but it's better in Next.js because of its flexibility and simple functionality. Timestamp: 2:08 (watch the section; it's pretty interesting, forcing users to shift routes and qurry'ing and its pretty simple code ).





"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation" //updated and higher vir import dont forget Next/<import> is always recomened

const NavigationTestPage = () => {

  // CLIENT SIDE NAVIGATION
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get("q")

  console.log(q)  // The URL is "/navigation?q=test". Basically, he's just getting the query, which is great for filtering and searching within your site.

  const handleClick = ()=>{
    console.log("clicked")
    router.forward()
  }

  return (
    <div>
      <Link href="/" prefetch={false}>Click here</Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  )
}

export default NavigationTestPage
```

```js
//dont use  {cache: "no-store"} when you have large ammounst fo data changing, but if your data is retaibly conststant with minro changes then use it,

const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  cache: "no-store",
});

//{revalidate:3600} will refesh your data evey 1 hour = 3600
const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  next: { revalidate: 3600 },
});
```

```js
// cool concept:
// since the each blog holds all of teh json place holder inc teh user id and id, by linking }href={`/blog/${post.id}`}
// we can get the id from each post and travel inside of it
//THIS IS ONLY POSSIBLE BECAUSE OF THE WAY THE BLONDE FILES ARE STORED, AND THE SLUG

//this will take in dynamic id giving by the blog from the api
<Link className={styles.link} href={`/blog/${post.id}`}>
  READ MORE
</Link>
```

```js


// In Next.js, when using dynamic routes, you can access the route parameters (like the slug or post ID) through the params object in the page component's props. This is part of Next.js's built-in functionality for handling dynamic routes.

const SinglePostPage = async ({ params }) => { // using params, slug is passed as a parameter its a buit in function in nextjs

const {slug} = params
  const posts = await getData(slug) //passing slug as a parameter in side getdata (fetch func), slug's raw value is /blog/[slug]

//   The params object allows you to access the dynamic route parameters passed to the page component in Next.js.

```

```js
import Image from "next/image";
import React, { Suspense } from "react";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/PostUser";

const getData = async (slug) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`); // using slug as a parameter
  // THIS WHOEL API IS STURCTED AROUND USER, POST'S AND OTHER DATA YOU WOULD SEE IN SOCIAL MEDIA
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const SinglePostPage = async ({ params }) => {
  // using params, slug is passed as a parameter its a buit in function in nextjs

  const { slug } = params;
  const posts = await getData(slug); //passing slug as a parameter in side getdata, slug's raw value is /blog/[slug]

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/19294343/pexels-photo-19294343/free-photo-of-pink-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
          className={styles.img}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}> {posts.title} </h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={posts.userId} />
          </Suspense>
          {/*  passing userId from  `https://jsonplaceholder.typicode.com/posts/` allowing me to access a single post from the api */}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>aUTHOR</span>
            <span className={styles.detailValue}>detailValue</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>detailValue</span>
          </div>
        </div>
        <div className={styles.content}>{posts.body}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
```

```js
//Powerful stuff

// src\lib\data.js

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const posts = [
  { id: 1, title: "Post 1", body: "......", userId: 1 },
  { id: 2, title: "Post 2", body: "......", userId: 1 },
  { id: 3, title: "Post 3", body: "......", userId: 2 },
  { id: 4, title: "Post 4", body: "......", userId: 2 },
];
export const getPosts = async () => {
  return posts;
};

export const getPost = async (id) => {
  return posts.find((post) => post.id === id);
};

export const getUser = async (id) => {
  return posts.find((post) => post.id === id);
};

//src\app\blog\page.jsx

import { getPosts } from "@/lib/data";

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
```

```js
// Don't pay attention to this code too much; it's just an example of how you can communicate code between data (node) to next.js + App and Components , rather than using fetching an API within the page's .jsx. It's cleaner to put all functional code in your lib/data.js.

// Fetching all the posts from the mock API
export const getPosts = async () => {
  return posts; // returning all the posts
};

// Fetching a single post from the mock API
export const getPost = async (id) => {
  // finding the post based on the id
  const post = posts.find((post) => post.id === parseInt(id));

  // returning the found post
  return post;
};

// Fetching a user from the mock API
export const getUser = async (id) => {
  // finding the user based on the id
  const user = users.find((user) => user.id === parseInt(id));

  // returning the found user
  return user;
};

// Sample data
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const posts = [
  { id: 1, title: "Post 1", body: "......", userId: 1 },
  { id: 2, title: "Post 2", body: "......", userId: 1 },
  { id: 3, title: "Post 3", body: "......", userId: 2 },
  { id: 4, title: "Post 4", body: "......", userId: 2 },
];
```

```js
// After logging in and creating a project, and creating a cluster, you need to press "Connect" and follow the instructions.
// - npm install mongodb

// - mongodb+srv://bhattaraianjesh123:<password>@cluster0.l7tduy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// simple boilerplate code:  boilerplate code means you don't have to memorize it

const mongoose = require("mongoose");

const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("using an existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to MongoDB:  `" + error + "`");
  }
};
```

```js
// So, I found out that your .env file must not contain white spaces. My mistake was having a space between '=' because I assumed it was a normal variable declaration.

MONGO_URI = ""; // correct

MONGO_URI = ""; // incorrect
```

```js
//common tut miskate
//he keeps reandeirng

{
  post?.desc;
}

//and at time i forget to add ? and my whole program falls into errors
```

```js
// For a better SEO
//When the title is generated, the %s placeholder will be replaced with a specific value. For example, if you have a page with the title "About Us", the %s will be replaced with "About Us", resulting in the title "About Us | Next.js 14".
export const metadata = {
  //layout.jsx
  title: {
    default: "Next.js 14 Homepage",
    template: "%s | Next.js 14", // it seems like a place holder, like a template `%{pageTitle}`
  },
  description: "Next.js starter app description",
};
//-----------------------

export const metadata = {
  // about/page.jsx
  title: "About Page",
  description: "About description",
};
```

## Server Action's Example

```js



//lib/action
const sayHello =  async () => { // when use server it has to be async
    "use server";

    console.log("hello");
}


//serveractiontest/page.jsx
import React from 'react'
import {sayHello} from "@/lib/action" // I forgot the function name was sayHello and not say(h)ello (lower case "h"). Make sure you always have a good naming convention to stop these types of stupid errors, and actually read the code. Maybe TypeScript is good, but then again I didn't read the error correctly. Maybe I should have hovered over 'i' and read it.


const ServerActionTest  = () => {   // Yeah, so action outputs anything as long as a button is present, basically like a form submit, but without the id of "submit".
  return (

    <div>
    <form action={sayHello}>  <button> test </button> </form>

    </div>

  )
}

export default ServerActionTest

    // If "use server" is included, your function will be executed on the server
    // and it needs to be an async function.
    // If it is not intended to be a server component, you can leave it as it is.
    // You can remove "async" if its not intended to bt asynchronous. In the page.jsx, you must add "use client"
    // to tell the renderer it is a client component, so render it in the client, please.

//----------------------------------------------------------------------------------

// By removing "use server" from a function in Next.js, it becomes a regular JavaScript function not bound by Next.js's rendering rules. It can execute both on the server and the client.

// If you use "use client" on a function, it indicates that this function should only execute on the client-side, meaning it won't run during server-side rendering but will run in the browser once the page is loaded.

// However, removing "use server" doesn't prevent the function from rendering on the server; it simply means the function can execute on both the server and the client, depending on the context in which it's called.


export const sayHello = () => {


    console.log("hello");
}




"use client"
import React from 'react'
import {sayHello} from "@/lib/action"
const ServerActionTest  = () => {
  return (

    <div>
    <form action={sayHello}>  <button> test </button> </form>
    </div>

  )
}

export default ServerActionTest




```

# Extra Info Regarding Next.js

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
