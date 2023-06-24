import { PrismaClient } from "@prisma/client";
import styles from "./page.module.css";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import FormLabel from "../components/forms/FormLabel";
import FormInput from "../components/forms/FormInput";
import FormSubmitButton from "../components/forms/FormSubmitButton";
const registrationForm = async () => {
  async function handleSubmit(formData: FormData) {
    "use server";

    const prisma = new PrismaClient();

    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm password");

    //handle empty inputs
    if (
      !String(email).trim() &&
      !String(username).trim() &&
      !String(password).trim() &&
      !String(confirmPassword).trim()
    ) {
      console.log("error1");

      return;
    }

    //handle passwords not matching
    if (password !== confirmPassword) {
      console.log("error2");

      return;
    }

    //handle weak password
    if (password?.length! < 6) {
      console.log("error3");

      return;
    }

    //handle email exists
    const submittedEmail = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });
    if (submittedEmail) {
      console.log("error4");

      return;
    }

    //handle username exists
    const submittedUsername = await prisma.user.findUnique({
      where: {
        name: String(username),
      },
    });
    if (submittedUsername) {
      console.log("error5");

      return;
    }

    //handle username length
    const longUsername = String(username).trim().length > 20;
    if (longUsername) {
      console.log("error6");
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        email: String(email),
        name: String(username),
        password: await hash(String(password), 12),
      },
    });

    // handle db failure
    if (!newUser) {
      console.log("error7");

      return;
    }

    // handle success
    if (newUser) {
      redirect("/api/auth/signin");
    }
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <FormLabel htmlFor="email" title="Email" />
      <FormInput type="email" name="email" placeholder="bob@things.com" />

      <FormLabel htmlFor="username" title="Username" />
      <FormInput type="username" name="username" placeholder="username" />

      <FormLabel htmlFor="password" title="Password" />
      <FormInput type="password" name="password" placeholder={undefined} />

      <FormLabel htmlFor="confirm password" title="Confirm Password" />
      <FormInput type="confirm password" name="confirm password" placeholder={undefined}/>

      <FormSubmitButton title="Register" />
    </form>
  );
};

export default registrationForm;
