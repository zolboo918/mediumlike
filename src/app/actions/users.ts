"use server";

import { createUser, deleteUser, updateUser } from "@/lib/prisma/user";
import { Prisma } from "@prisma/client";

export const addUser = async (post: Prisma.UserCreateInput) => {
  return createUser(post);
};

export const editUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return updateUser(id, data);
};

export const removeUser = async (id: string) => {
  return deleteUser(id);
};
