import React from "react";
import Author from "@/components/Author";

export default async function Page() {
  const signedUserId = 1;
  return <Author authorId={signedUserId} />;
}
