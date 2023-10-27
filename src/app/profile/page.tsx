import React from "react";
import Author from "@/components/Author";
import { nextOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(nextOptions);
  if (!session) {
    redirect("/signin");
  } else {
    return <Author author={session.user} isEditable={true} />;
  }
}
