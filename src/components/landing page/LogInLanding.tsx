"use client";
import { signIn } from "next-auth/react";
import styles from "./LogInLanding.module.css";
import { FormEvent, useRef } from "react";
import FormInput from "../forms/FormInput";
import FormLabel from "../forms/FormLabel";
import Link from "next/link";



const LogInLanding = () => {
  const emailRed = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const email = emailRed.current!.value;
    const password = passwordRef.current!.value;

    const response = await signIn("credentials", {
      email: email,
      password: password,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Login into your account</h1>
        <FormLabel htmlFor="email" title="Email Address" />
        <FormInput
          type="text"
          placeholder="Email"
          ref={emailRed}
          value={undefined}
          name="email"
        />
        <FormLabel htmlFor="password" title="Password" />
        <FormInput
          type="password"
          placeholder="Password"
          ref={passwordRef}
          value={undefined}
          name="password"
        />
        <button type="submit" className={styles.loginButton}>Log in</button>
        <Link href={'/register'}>
        <p className={styles.signupButton}>Sign up</p>
        </Link>
      </form>
    </div>
  );
};
export default LogInLanding;
