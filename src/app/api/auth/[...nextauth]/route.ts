import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {


        if (!credentials?.email || !credentials.password ) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const passwordIsValid = await compare(credentials.password, user.password)
        if (!passwordIsValid) {
          return null
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        }
      },





    }),
  ],
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
