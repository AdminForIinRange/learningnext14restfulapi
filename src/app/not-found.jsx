import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      Sorry not found
      <Link href={"/"}> Return Home</Link>
    </div>
  );
};

export default NotFound;
