import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authoptions =  NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  // Any other NextAuth configuration can be added here
  session: {
    strategy: "jwt",  // Use JWT for session management
  },
  callbacks: {
    async session({ session, token }) {
      // You can modify session here if needed (e.g., add user info)
      session.user.id = token.id;
      return session;
    }
  }
})

export { authoptions as GET, authoptions as POST };
