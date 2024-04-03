import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth(); 
  // you could create a function that does this in the lib
  //folder to reduce repetition and make it more organized



  {session?.user ?  console.log(session.user?.name) : console.log("no user, value: " + session)}
  //if session ture, and it conatains user, and if that statement is true then console log session.user.name else console log no user
  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
