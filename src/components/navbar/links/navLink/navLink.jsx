"use client";

import React from "react";
import styles from "./navLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();
  return (

        // Click on the overlay links; they will all become rounded.
// If the pathname === item path, and if that's true,
// then change the class to active, which just changes
// the color of the background and font. It was always rounded
// and had a block around it, just not no bg color; that's why it didn't show.

    <Link
      className={`${styles.container} 
      
      ${ // just read the func its simple
        pathName === item.path && styles.active // is pathname "url/ur" is equal to item.title then active class will
      }`}
      href={item.path}
    >
      {" "}
      {item.title}
    </Link>
  );
};

export default NavLink;
