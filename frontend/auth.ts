import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {handlers, auth, signIn, signOut} = NextAuth({
  callbacks: {
    async signIn({ account, profile }) {
      // TODO: call backend API to create user
      return true
    },
  },
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
})