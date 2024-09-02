import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import * as process from "node:process";

export const {handlers, auth, signIn, signOut} = NextAuth({
  callbacks: {
    async signIn({account, profile}) {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile?.name,
          email: profile?.email,
          avatar: profile?.picture
        })
      })
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