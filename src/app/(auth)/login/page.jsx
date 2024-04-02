import { auth, signIn } from "@/lib/auth"; // From your /lib, they feel like little reducers,
// like in Redux toolkit slice, just like how you would call them to authenticate with
//Firebase, mainly for signing out like a function.

import React from "react";

const LoginPage = async () => {
  const session = await auth();

  console.log(session);

  /* //so when i use Action, i am directing the location of where the event will be sent to.
     BTW: React automatically passes the event object to the event handler function
     */
  const handleLogin = async (e) => {
    //it must be async and it is "use server"
    // he dose need a the event, it is automatically passed to the event handler function
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
