"use server"; // dont forget this is Server Side Rendered

import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { auth, signIn, signOut } from "./auth";

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
  const { username, email, password, passwordRepeat } = Object.fromEntries(formData);




  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await auth.getUserByEmail({username});

if (user) {
   return { error: "Username already taken" };

}
    
    const newUser = new User({ username, email, password });

    await newUser.save();

    console.log("new user created");
  } catch (err) {
    console.log(err);

    return { error: err.message };
  }
};
