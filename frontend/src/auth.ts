import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {handlers, auth, signIn, signOut} = NextAuth({
  callbacks: {
    async signIn({ account, profile }) {
      // TODO: call backend API to create user
      return true
    },
    async session({ session, token }) {
      console.log(session)
      console.log(token)
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken

      return session
    }
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