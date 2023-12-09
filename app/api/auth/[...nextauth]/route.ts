import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signInCallback(url, account, profile) {
      return Promise.resolve(true);
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
