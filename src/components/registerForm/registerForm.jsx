"use client";  // this is a client/browser component indefinitely, from the amount of
// react components and imports/functions like useState, useEffect, etc.

import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  // register is a function defined in action.js, and the undefined is the default value of the state,
  // if register returns undefined, then the default value of the state will be undefined,
  // but if register returns some value, then the default value of the state will be that value

  // Get router object using useRouter hook
  const router = useRouter();

  // Use useEffect hook to perform side effects based on state and router changes
  useEffect(() => {
    // If state.success is true, redirect to "/login" page
    state?.success && router.push("/login");
  }, [state?.success, router]); // Dependencies: state.success and router

  // Return JSX for the RegisterForm component
  return (
    <form className={styles.form} action={formAction}>
      {/* Input fields for username, email, password, and password repeat */}
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      {/* Register button */}
      <button>Register</button>
      {/* Display error message from state */}
      {state?.error}
      {/* Link to login page */}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;