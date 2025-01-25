import User from "@/models/user";
import { connectMongoDB } from "@/utils/mongo";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectMongoDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Attach user ID to token object
      if (user) {
        token.id = user.id; // Use MongoDB user ID
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("TOKEN:", token);

      // session.user.id = token.id as string; // Cast token.id to string
      // session.user.isVerified = token.isVerified as boolean;
      // console.log("TOKEN", token);
      // console.log(session);
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectMongoDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
          });
          user.id = newUser._id; // Assign new user's MongoDB ID to user object
        } else {
          user.id = existingUser._id; // Assign existing user's MongoDB ID to user object
          user.name = existingUser.name;
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
