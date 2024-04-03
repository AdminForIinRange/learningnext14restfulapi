import { handleGithubLogin } from "@/lib/action";


// From your /lib, they feel like little reducers,
// like in Redux toolkit slice, just like how you would call them to authenticate with
//Firebase, mainly for signing out like a function.

import React from "react";

const LoginPage = async () => {

  
 

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
