import { handleGithubLogin } from "@/lib/action";
// From your /lib, they feel like little reducers,
// like in Redux toolkit slice, just like how you would call them to authenticate with
//Firebase, mainly for signing out like a function.

import React from "react";

const LoginPage = async () => {
  const session = await auth();

  console.log(session);

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
