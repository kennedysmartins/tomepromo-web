import NextAuth from "next-auth"
import GoogleProvier from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvier({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
