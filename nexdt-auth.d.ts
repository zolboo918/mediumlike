import { DefaultUser } from "next-auth";
import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: DefaultUser;
  }
}
