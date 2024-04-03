"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  // Destructure the return values of the useFormState hook into two variables: state and formAction
  // 'state' represents the current state of the form, which includes values like error messages, success status, etc.
  // 'formAction' represents the function to be called when the form is submitted, typically used as the form's action attribute

  const [state, formAction] = useFormState(login, undefined);
  // Here, 'login' is a function defined in action.js responsible for handling the login action.
  // The second argument, 'undefined', is the default value of the form state.
  // If the 'login' function returns 'undefined', then the default value of the form state will be 'undefined'.
  // If 'login' returns some other value, then that value will be the default state of the form.

  return (
    <form className={styles.form} action={formAction}>
      {/* Input fields for username and password */}
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      {/* Login button */}
      <button>Login</button>
      {/* Display error message from state */}
      {state?.error}
      {/* Link to registration page */}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
