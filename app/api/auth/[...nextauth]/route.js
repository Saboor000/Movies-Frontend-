import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axiosInstance from "@/lib/axiosInstance";

export const authOptions = {
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: { secret: process.env.NEXTAUTH_SECRET, maxAge: 24 * 60 * 60 },

  providers: [
    // ✅ EMAIL/PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await axiosInstance.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const data = res.data;

          if (data?.access_token && data?.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              role: data.user.role,
              access_token: data.access_token,
            };
          }

          return null;
        } catch (error) {
          console.error(
            "Login failed:",
            error?.response?.data || error.message
          );
          return null;
        }
      },
    }),

    // ✅ GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // ✅ THIS IS THE MOST IMPORTANT FIX
    async jwt({ token, user, account }) {
      // ✅ NORMAL LOGIN
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.access_token;
      }

      // ✅ GOOGLE LOGIN → EXCHANGE TOKEN WITH YOUR BACKEND
      if (account?.provider === "google") {
        const res = await axiosInstance.post("/auth/google", {
          id_token: account.id_token, // ✅ send Google ID token to backend
        });

        token.id = res.data.user.id;
        token.email = res.data.user.email;
        token.role = res.data.user.role;
        token.accessToken = res.data.access_token; // ✅ BACKEND JWT
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.accessToken = token.accessToken; // ✅ THIS IS WHAT YOUR API USES
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
