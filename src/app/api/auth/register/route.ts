import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { UserRegistrationForm } from "@/app/register/page";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = (await request.json()) as UserRegistrationForm;

  const username = body.username;
  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  //handle empty inputs
  if (email.trim() === "") {
    return new Response(
      JSON.stringify({ message: "email is required", failure: 1 })
    );
  }

  if (username.trim() === "") {
    return new Response(
      JSON.stringify({ message: "username is required", failure: 2 })
    );
  }

  if (password.trim() === "") {
    return new Response(
      JSON.stringify({ message: "password is required", failure: 3 })
    );
  }

  if (confirmPassword.trim() === "") {
    return new Response(
      JSON.stringify({
        message: "password confirmation is required",
        failure: 4,
      })
    );
  }
  //handle username length
  const longUsername = username.trim().length > 20;
  if (longUsername) {
    return new Response(
      JSON.stringify({ message: "username too long", failure: 5 })
    );
  }

  //handle passwords not matching
  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({ message: "passwords do not match", failure: 6 })
    );
  }

  //handle weak password
  if (password?.length! < 6) {
    return new Response(
      JSON.stringify({ message: "password is too weak", failure: 7 })
    );
  }

  //handle email exists
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingEmail) {
    await prisma.$disconnect();
    return new Response(
      JSON.stringify({ message: "email already exists", failure: 8 })
    );
  }

  //handle username exists
  const existingUsername = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });
  if (existingUsername) {
    await prisma.$disconnect();
    return new Response(
      JSON.stringify({ message: "username taken", failure: 9 })
    );
  }

  const newUser = await prisma.user.create({
    data: {
      email: String(email),
      name: String(username),
      password: await hash(String(password), 12),
    },
  });
  await prisma.$disconnect();

  // handle db failure
  if (!newUser) {
    return new Response(
      JSON.stringify({ message: "somehting went wrong :(", failure: 10 })
    );
  }

  return new Response(JSON.stringify({ message: "ok", failure: 0 }));
}
