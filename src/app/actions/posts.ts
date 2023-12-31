"use server";

import { createPost, deletePost, updatePost } from "@/lib/prisma/posts";
import { Prisma } from "@prisma/client";

export const addPost = async (post: Prisma.PostCreateInput) => {
  return createPost(post);
};

export const editPost = async (id: string, data: Prisma.PostUpdateInput) => {
  return updatePost(id, data);
};

export const removePost = async (id: string) => {
  return deletePost(id);
};
