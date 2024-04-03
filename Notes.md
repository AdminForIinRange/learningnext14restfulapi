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

## API Fetching

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
// since the each blog holds all of the json place holder inc the user id and id, by linking }href={`/blog/${post.id}`}
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

## Server Actions

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

//-------------------------------------

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
//---------------------

// src\app\blog\[slug]\page.jsx

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};
```

## API Fetching VS Server Actions

```js
// Server actions in Next.js typically involve operations that occur on the server side,
// such as fetching data or performing computations, before the page is rendered.
// These actions are executed within the Next.js server environment.

// API fetching, on the other hand, involves making requests to external APIs to retrieve data
// for use in client-side rendering. This fetching usually happens on the client side,
// allowing for dynamic updates without full page reloads.

//exmaples below

// pages/serverData.js

export async function getServerSideProps(context) {
  // Fetch data from an API or perform server-side computations
  const data = await fetchDataFromServer();

  // Pass data to the page component as props
  return {
    props: {
      data,
    },
  };
}

function ServerData({ data }) {
  // Render the page with server-side data
  return (
    <div>
      <h1>Server-side Data</h1>
      <p>{data}</p>
    </div>
  );
}

export default ServerData;


// pages/clientData.js

import { useEffect, useState } from 'react';

function ClientData() {
  const [data, setData] = useState('');

  useEffect(() => {
    // Fetch data from an API or perform client-side computations
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  // Render the page with client-side data
  return (
    <div>
      <h1>Client-side Data</h1>
      <p>{data}</p>
    </div>
  );
}

export default ClientData;



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


const ServerActionTest  = () => {   // Yeah, so action outputs anything as long as a button is present, basically like a form submit, but without the type="submit".
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

## action is for use server and handle submit is for use client

```JS

//works well and has no issues, it and handel submit is not that far apart

  const handleInputLog = async (e) => { //you still need to pass in event
    // he dose need a the event, it is automatically passed to the event handler function
    "use server";

    const { text } = Object.fromEntries(e); // since you don't have a state connected to your input with onChange
    // you have to destructrue it, and your event is an object too

    console.log(text); //logging text, normally you can log state
  };

  return (
    <div>
      {/* extracts the event and auto passing it to the function within {} */}
      <form onSubmit={handleInputLog}>

        <input type="text" placeholder="text" name="text" />
        <button>click</button>   {/*  form auto assign's this a type="submit" */}
      </form>
    </div>
  );
};

//READ THE STUFF I WROTE AND BACK CHECKED BELOW

```

## Server Side Input's with "action={}" and name

```js
import React from "react";
import { addPost } from "@/lib/action";
  return (
    <div>
      {/* //so when i use Action, i am directing the location of where the data event will be sent to.
     BTW: React automatically passes the event object to the event handler function
     */}

      {/*
onSubmit is a client-side event handler for form submissions, while action is an HTML
attribute that defines the server-side endpoint where form data should be sent.
 */}

      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />{" "}
        {/*  The "name" attribute is primarily used to identify form data on the server-side or when accessing form data via JavaScript on the client-side.
         */}
        <input type="text" placeholder="desc" name="desc" />
        <input type="text" placeholder="slug" name="slug" />
        <input type="text" placeholder="userId" name="userId" />
        <button type="submit"> test </button>{" "}
      </form>
    </div>
  );
};

export default ServerActionTest;
```

## Grasping Server Side input concepts and Other

```js
/* In React, when you define a form with an onSubmit event handler, 
    React automatically passes the event object to the event handler function when the form is submitted.
    Therefore, in your addPost function, you can access the event object if needed. */

import { Post } from "./models";
import { connectToDb } from "./utils";

/* //so when i use Action, i am directing the location of where the event will be sent to.
     BTW: React automatically passes the event object to the event handler function
     */

// action attribute: Specifies the URL for form data processing.
// It directs the browser to send a request to this URL when the form is submitted.
// This traditional HTML attribute predates React and defines where the form data should be submitted.

// onSubmit attribute: Specifies a JavaScript function to handle form submissions in React.
// When the form is submitted, React calls the specified function (e.g., handleSubmit)
// with the event object as its argument (if included).
// Using event.preventDefault() within this function prevents default submission behavior,
// enabling form submission handling within your React component.

/* 
onSubmit is a client-side event handler for form submissions, while action is an HTML 
attribute that defines the server-side endpoint where form data should be sent.
 */

export const addPost = async (formData) => {
  "use server";

  // he get() method of FormData allows you to retrieve the value associated with a specific
  //name/key. So, when you call formData.get("title"), it retrieves the value entered into
  // the input field with the name "title". Similarly, you use the other names to retrieve the respective values entered into the input fields.

  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");
  // const userId = formData.get("userId");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  // this line above  essentially converts the FormData object into a regular JavaScript
  // object and then extracts specific properties from it, making them available
  //  as variables in the current scope. This approach is often used to simplify
  //  accessing form data in JavaScript.

  try {
    connectToDb();
    const newPost = new Post({ title, desc, slug, userId });
    await newPost.save();

    //const newPost = new Post({ title, desc, slug, userId });:
    //This line creates a new instance of a Post object.
    //await newPost.save();: This line saves the newly created Post object to the database.

    console.log("new post added");
  } catch (err) {
    console.log(err);
  }

  console.log(title, desc, slug, userId);
};

// If "use server" is included, your function will be executed on the server
// and it needs to be an async function.
// If it is not intended to be a server component, you can leave it as it is.
// You can remove "async" if its not intended to bt asynchronous. In the page.jsx, you must add "use client"
// to tell the renderer it is a client component, so render it in the client, please.
```

## POST to MongoDB (adding data to collection)

```js
import { Post } from "./models";
import { connectToDb } from "./utils";

export const addPost = async (formData) => {
  "use server";
  // //creates a "new" instance of post then with the destrued elemenst from   const { title, desc, slug, userId } = Object.fromEntries(formData),
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    //  After connecting to DB, new Post (imported from the model, takes in all { title, desc, slug, userId }
    connectToDb();
    const newPost = new Post({ title, desc, slug, userId });
    await newPost.save();
    // awiat then saves await newPost.save();

    console.log("new post added");
  } catch (err) {
    console.log(err);
  }

  console.log(title, desc, slug, userId);
};
```

```js
revalidatePath(`/blog`);
// The revalidate option in Next.js refreshes the content
//of the page on the server-side, not in the browser.

// Since SSR renders static HTML pages at build time,
// without revalidate, these pages would remain static until the next build.
// The revalidate option ensures that the page content is periodically updated,
//  allowing clients to see new data, such as posts, without requiring a full rebuild
// of the site.
```

## deletePost via findByIdAndDelete(id)

```js
//serveractiontest/page.jsx

//its juts a input tag form that asks the user for an Id, and you type in the id you want then the event gets directed (REACT auto grabs the event) to @/lib/action by the action={deletePost}

import { deletePost } from "@/lib/action";
<form action={deletePost}>
  <input type="text" placeholder="id" name="id" />
  <button> test </button>{" "}
</form>;

//lib/action.js

// export const deletePost = async (formData) Tt takes in in the event from the input given by the action={deletePost} and destructrue's the id

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb(); //then it connects to the DB, try/catch to find and errors

    await Post.findByIdAndDelete(id); //removing post via Id from form data

    console.log(" post deleted");
    revalidatePath(`/blog`); // lastly it revalidatePath, (already explained = crt+F)
  } catch (err) {
    console.log(err);
  }

  console.log(id);
};
```

## RestFul API

```js
// Conceptually, it's easy to understand because I have some experience in Node.js/Express.js, and we already went through server actions and already did some API fetching to JSON placeholder a few hours before, and the code is still there just commented out. The fields are the same anyways, like post, posts, slug, params, and such.

// Restful API and server actions code are not that far off because they both use MongoDB connection and other built-in functions from MongoDB. To say which one is better is hard because I like both, but Restful API wins in cases because I already have some level of experience with it, and I plan to expand on it more. However, Next.js server actions are still pretty good, and I realize I've been doing some server actions when I was using Firebase unknowingly. But I really do want to expand on my restfulness and hopefully get better at using MongoDB, a real DB. I mean Firebase is also a real DB too and has way more built-in stuff like AUTH and stuff, so maybe using them both in conjunction would be a win-win.
```

## Using RESTFUL API, GET via Route

```js
//src\app\api\blog\route.js

import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    connectToDb();

    const posts = await Post.find();
    return NextResponse.json(posts); //NextResponse: This represents the response object that will be sent back to the client.

    // .json(): This is a method that converts the data passed to it (in this case, posts) into JSON format.
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

//-------------------------------------

// src\app\blog\page.jsx

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
```

## Allow Api request to access [slug] and GET via route

```js
// src\app\api\blog\[slug]\route.js

import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req, { prams }) => {
  const { slug } = prams;
  try {
    connectToDb();

    const post = await Post.findOne({ slug }); //just like in src\lib\data.js
    return NextResponse.json(post);
    //NextResponse: This represents the response object that will be sent back to the client.
    // .json(): This is a method that converts the data passed to it (in this case, posts) into JSON format.
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

//-------------------------------------

// src\app\blog\[slug]\page.jsx

// Define an asynchronous function named getData that takes a 'slug' parameter
const getData = async (slug) => {
  // Fetch data from the specified API endpoint using the provided 'slug'
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    // Optional: Provide configuration for Next.js Incremental Static Regeneration
    next: { revalidate: 3600 }, // Revalidate data every 3600 seconds (1 hour)
  });

  // Check if the response is not okay (HTTP status code other than 200)
  if (!res.ok) {
    // Throw an error if something went wrong with the request
    throw new Error("Something went wrong");
  }

  // Return the response body as JSON
  return res.json();
};

const SinglePostPage = async ({ params }) => {
  // using params, slug is passed as a parameter its a buit in function in nextjs

  const { slug } = params;
  const post = await getData(slug);

  // const post = await getPost(slug); //passing slug as a parameter in side getdata, slug's raw value is /blog/[slug]
};

export default SinglePostPage;
```

## DELETE via route

```js
export const DELETE = async (req, { prams }) => {
  const { slug } = prams;
  try {
    connectToDb();

    const post = await Post.findByIdAndDelete({ slug }); //just like in src\lib\data.js
    return NextResponse.json("deleted"); //NextResponse: This represents the response object that will be sent back to the client.
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
```

## Auth

```js
// Using Next-Auth from Auth.js
//In this case we are using Github as a Auth method
import NextAuth from "next-auth"; // Import the NextAuth library
import GitHub from "next-auth/providers/github"; // Import the GitHub provider

// Initialize NextAuth with the desired authentication providers
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID, // GitHub OAuth client ID
      clientSecret: process.env.GITHUB_SECRET, // GitHub OAuth client secret
    }),
  ],
});
```

## Console.log'ing our Auth session and logging in via github

```js
// src\app\api\auth\[...nextauth]

//this file name allows us to to map over all the auth function, within nextauth, so you don't have to make sigin-In, siginout, login  session and such and such.

//using Auth.js you dont have to worry about cookies and session and what not, firebase auth is teh same too i believe

//-------------------------------------
//src\app\api\auth\[...nextauth]\route.js

const { GET, POST } = require("@/lib/auth"); // from  "handlers: {GET, POST}" above

export { GET, POST };

//-------------------------------------

// src\app\(auth)\login\page.jsx

import { auth, signIn } from "@/lib/auth";

import React from "react";

const LoginPage = async () => {
  const session = await auth();

  console.log(session);

  const handleLogin = async (e) => {
    "use server";

    const { text } = Object.fromEntries(e);
    await signIn("github");
    console.log(text);
  };

  return (
    <div>
      <form action={handleLogin}>
        <input type="text" placeholder="text" name="text" />
        <button>cLick</button>
      </form>
    </div>
  );
};

export default LoginPage;
```

## handleGithubLogin to action.js and signIn("github"); via Auth.js

```js
export const handleGithubLogin = async () => {
  // its best practice to put all your serve actions/function's/component's in one file

  await signIn("github");
};
```

## handleLogout via signOut("github") via Auth.js

```js
export const handleLogout = async () => {
  await signOut("github"); // pretty rudimentary, naming convention, although i would of perrfed logot, not signout

  console.log(session);
};
```

## When a button is clicked inside a form, it auto refresh's, its a default behavior

```js
const LoginPage = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div>
      <form action={handleGithubLogin}>
        {/* When a button is clicked inside a form, it automatically refreshes the page 
   because handleGithubLogin does not have an e.preventDefault(), so the page will refresh,
    meaning it reruns the page again, that's why it's logging session. */}
        {/* //acts like an onClick for now, until we expand the login form */}

        <button>cLick</button>
      </form>
    </div>
  );
};

export default LoginPage;
```

## Server and Client, async and useState conflict

```js
//

const Links = async () => {

  //Async cant be assigned because its a server function, and below you are using useState, wish is a client function

  const [open, setOpen] = useState(false);

  const session = await auth();  // if you are using await, your top function must be async
```

## Passed Session as a prop to negate conflict above

```js
// Passed Session as a prop to negative  conflict above

const session = await auth();

// you could create a function that does this in the lib
 //folder to reduce repetition and make it more organized


// src\components\navbar\Navbar.jsx

const Navbar = async () => {
  const session = await auth();

  return (
  <Links session={session} /> // I can do this because Navbar.jsx does not have any client functions; it is static and not dynamic. It does not take any user input. However, the components inside do. It makes sense that certain components inside Navbar.jsx are client-based, while the overall Navbar.jsx that holds the client is server-based. It feels optimized, and Next.js only renders what it needs.

  )

//---------------------------------------------

// src\components\navbar\links\Links.jsx

const Links = ({ session }) => {

  const [open, setOpen] = useState(false);

```

## ?. operator, great for true checking: session.user?.isAdmin

```js


//Using session.user.isAdmin without the optional chaining operator ?. assumes that session.user always exists and has an isAdmin property. If session.user were to be null or undefined, accessing the isAdmin property directly would result in a runtime error, typically causing your application to crash.


  {session?.user ?  (  // if session is true, and it contain's user and if that statement is true again then => , if session.user is also true, and it contains isAdmin and thats also true (&&) then render <>
          <>
            {session.user?.isAdmin  && <NavLink item={{ title: "Admin", path: "/admin" }} />}{" "}
```

## junior vs senior diffenace in code quilty (i think)

```js
//junior

if (session === null) {
  console.log("no user");
} else console.log(session.user.name);

//senior

{
  session ? console.log(session.user.name) : console.log("no user");
}
```

## Weird CSS Code, Either, high lvl css or bad code idk

```js
const NavLink = ({ item }) => {
  const pathName = usePathname();
  return (
    // Click on the overlay links; they will all become rounded.
    // If the pathname === item path, and if that's true,
    // then change the class to active, which just changes
    // the color of the background and font. It was always rounded
    // and had a block around it, just not no bg color; that's why it didn't show.

    <Link
      className={`${styles.container} 
      
      ${
        // just read the func its simple
        pathName === item.path && styles.active // is pathname "url/ur" is equal to item.title then active class will
      }`}
      href={item.path}
    >
      {" "}
      {item.title}
    </Link>
  );
};
```

## My session Checker session?.user ? :

```js
{
  session?.user
    ? console.log(session.user?.name)
    : console.log("no user, value: " + session);
}
//if session ture, and it conatains user, and if that statement is true then console log session.user.name else console log no user
```

## Creating new User via the Github Auth, via Auth.js and NextAuth "next-auth"

```js

// src\lib\auth.js


  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          // retieving the user email from db
          if (!user) {
            // if user email is not found/false
            const newUser = new User({
              //create new user
              name: profile.name,
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });

            await newUser.save(); // saving the new user to db
          }
        } catch (err) {
          console.log(err);
          return false; // end the auth function with a false
          // if there is an error (no lingering sessions)
        }
      }
      return true;
    },
  },


// Github Singin profile console.log 
 console.log(profile);

// i removed some sensitive information

  login: 'AdminForIinRange',
  id: 91888685,
  node_id: 'U_kgDOBXocLQ',
  avatar_url: 'https://avatars.githubusercontent.com/u/91888685?v=4'
  type: 'User',
  site_admin: false,
  name: 'Anjesh',
  location: ' ',
  email: '',

}

```

## Cheak if user's Login matches the DB

```js



const login = async (credentials) => {
  // Login: This function checks if the user's login email and password match the database. 
  //You're not creating a new user, you are simply checking if they exist in the user collection.
  try {
    connectToDb(); // Connecting to the database
    const user = await User.findOne({ username: credentials.username }); // Finding user by username

    // If user not found, throw an error
    if (!user) {
      throw new Error("Wrong credentials!");
    }

    // Comparing passwords
    const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);

    // If password is incorrect, throw an error
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    // If everything is correct, return the user
    return user;

  } catch (err) {
    console.log(err); // Log any errors
    throw new Error("Failed to login!"); // Throw error for failed login attempt
  }
};



  CredentialsProvider({

      // This is an async function defined within CredentialsProvider. It takes credentials as an argument,
      // representing the credentials entered by the user during the authentication process.
      
      async authorize(credentials) {
        try {
          // Attempt to log in the user using the provided credentials
          const user = await login(credentials);
    
          // If login is successful, return the user object
          return user;
        } catch (err) {
          // If login fails due to incorrect credentials or any other error, return null
          return null;
        }
      },
    }),
  
```

## Copy of old action.js code

```js
"use server"; // dont forget this is Server Side Rendered

import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { auth, signIn, signOut } from "./auth";
import bcryptjs from "bcryptjs";

export const addPost = async (formData) => {
  // formData is an object containing data from the form

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({ title, desc, slug, userId });
    await newPost.save();

    console.log("new post added");
    revalidatePath(`/blog`);
    // The revalidate option in Next.js refreshes the content
    //of the page on the server-side, not in the browser.
  } catch (err) {
    console.log(err);
  }

  console.log(title, desc, slug, userId);
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id); //removing post via Id from form data

    console.log(" post deleted");
    revalidatePath(`/blog`);
  } catch (err) {
    console.log(err);
  }

  console.log(id);
};

export const handleGithubLogin = async () => {
  // its best practice to put all your serve actions/function's/component's in one file

  await signIn("github");
};

export const handleLogout = async () => {
  await signOut("github"); // pretty rudimentary, naming convention, although i would of perrfed logot, not signout
};

export const register = async (formData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await auth.getUserByEmail({ username });

    if (user) {
      return { error: "Username already taken" };
      // if user email is not found/false, teh retun data sets sent to teh useFormState,
      // and becomes the new state
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // this hasing, bcryptjs thing is pretty cool, maybe i can use it in other project, not just about Auth
    const newUser = new User({ username, email, password: hashedPassword });
    // making password hashed via "bcryptjs"

    await newUser.save();

    console.log("new user created");
  } catch (err) {
    console.log(err);

    return { error: err.message };
  }
};

export const login = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });

    console.log("new user created");
  } catch (err) {
    console.log(err);

    return { error: err.message };
  }
};

```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



## 

```js

//
```



