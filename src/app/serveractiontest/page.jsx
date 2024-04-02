import React from "react";
import { addPost, deletePost } from "@/lib/action";
const ServerActionTest = () => {
 
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
        <button> test </button>{" "}
      </form>

      <form action={deletePost}>
        <input type="text" placeholder="id" name="id" />
        <button> test </button>{" "}
      </form>
    </div>
  );
};

export default ServerActionTest;
