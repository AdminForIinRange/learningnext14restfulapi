import { handleGithubLogin } from "@/lib/action";
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

  return (
    <div>
      <form action={handleGithubLogin}>
        {/* //acts like an onClick for now, untill we expand teh login from */}
        <button>cLick</button>
      </form>
    </div>
  );
};

export default LoginPage;
