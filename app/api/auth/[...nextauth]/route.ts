import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "@/lib/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials 1 ");
        }

        const user = await db?.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("Usuario encontrado:", user);

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials 2");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials 3");
        }

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
