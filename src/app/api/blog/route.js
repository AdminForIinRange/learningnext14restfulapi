import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    connectToDb();

    const posts = await Post.find();
    return NextResponse.json(posts);
    //NextResponse: This represents the response object that will be sent back to the client.
    // .json(): This is a method that converts the data passed to it (in this case, posts) into JSON format.
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
