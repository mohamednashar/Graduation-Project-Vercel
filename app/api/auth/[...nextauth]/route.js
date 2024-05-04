import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, signOut } from "next-auth/react";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Make a POST request to the authentication endpoint using fetch
          const res = await fetch(`${API}Authentication/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: credentials.username,
              password: credentials.password,
            }),
          });
          const user = await res.json();
          if (res.ok && user) {
            // If successful, return the user data
            return user;
          } else {
            // If not successful, return null to indicate authentication failure
            return null;
          }
        } catch (error) {
          // If an error occurs during the API call, return null
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut:"/"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
