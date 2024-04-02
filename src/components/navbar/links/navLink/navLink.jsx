"use client";

import React from "react";
import styles from "./navLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();
  return (
    <Link
      className={`${styles.container} 
      
      ${
        pathName === item.path && styles.active // is pathname is equal to item.title then active class will
      }`}
      href={item.path}
    >
      {" "}
      {item.title}
    </Link>
  );
};

export default NavLink;
