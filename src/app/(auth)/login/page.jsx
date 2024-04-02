import React from "react";

const LoginPage = () => {
  /* //so when i use Action, i am directing the location of where the event will be sent to.
     BTW: React automatically passes the event object to the event handler function
     */
  const handleLogin = async (e) => {
    // he dose need a the event, it is automatically passed to the event handler function
    "use server";

    const { text } = Object.fromEntries(e);

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
