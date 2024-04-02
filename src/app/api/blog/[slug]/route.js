import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req, {prams}) => {

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


export const DELETE = async (req, {prams}) => {

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
