import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextOptions } from "../../auth/[...nextauth]/route";
import { deletePost, getPostById, updatePost } from "@/lib/prisma/posts";

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(nextOptions);

  if (!session) {
    new Response("Unauthorized", { status: 401 });
  }

  const post = await getPostById(id);

  if (!post) {
    new Response("Not found", { status: 404 });
  }

  const body = await request.json();
  const created = await updatePost(id, body);
  return NextResponse.json(created);
}

export async function DELETE(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(nextOptions);

  if (!session) {
    new Response("Unauthorized", { status: 401 });
  }

  const post = await getPostById(id);

  if (!post) {
    new Response("Not found", { status: 404 });
  }

  const deleteted = await deletePost(id);
  return NextResponse.json(deleteted);
}
