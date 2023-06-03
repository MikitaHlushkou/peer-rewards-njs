import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "@/lib/mongo/models";
import dbConnect from "@/lib/mongo/db";
import { IUser } from "@/types";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await UserModel.findOne({ email: credentials.email });
        if (user) {
          const isUserPasswordCorrect = await user.comparePasswords(
            credentials.password,
            user.password
          );

          if (!isUserPasswordCorrect) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            randomKey: "ran key",
          };
        }

        if (!user) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      await dbConnect();
      const user: IUser | null = await UserModel.findOne({
        email: token.email,
      });
      return {
        ...session,
        user: {
          ...session.user,
          fullName: user?.fullName,
          giftedRewardAmount: user?.giftedRewardAmount,
          receivedRewardAmount: user?.receivedRewardAmount,
          initials: user?.initials,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: async ({ token, user }) => {
      await dbConnect();
      const isUserExist = await UserModel.findOne({ email: token.email });

      if (!isUserExist) {
        await UserModel.create({
          fullName: token.name,
          email: token.email?.toLowerCase(),
          password: Math.floor(Math.random() * 1000) + 100000000,
        });
      }

      if (user) {
        const u = (user as unknown) as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
