"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavLink from "./navLink/navLink";
import styles from "./links.module.css";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const Links = () => {
  const links = [
    {
      title: "Homepage",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  const [open, setOpen] = useState(false);

  const session = true;
  const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.title} href={link.path}>
            <NavLink item={link} />
          </Link>
        ))}

        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}{" "}
            {/* Passing in a new obj to <NavLink /> */}
            <form action={handleLogout}> 
            <button className={styles.button}>Logout</button>
            </form>
           
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt="menu"
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
