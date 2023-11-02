import { createPost } from "@/lib/prisma/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextOptions);

  if (!session) {
    new Response("Unauthorized", { status: 401 });
  }

  const post = await request.json();
  const param = { ...post, userId: parseInt(session?.user.id!) };
  const created = await createPost(param);
  return NextResponse.json(created);
}
