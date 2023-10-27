import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getUsers(args: Prisma.UserFindManyArgs) {
  try {
    const result = await prisma.user.findMany(args);
    return { users: result };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id: string) {
  try {
    const result = await prisma.user.findUnique({ where: { id } });
    return { user: result };
  } catch (error) {
    return { error };
  }
}

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const result = await prisma.user.create({ data });
    return { user: result };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  try {
    const result = await prisma.user.update({ where: { id }, data });
    return { user: result };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    const result = await prisma.user.delete({ where: { id } });
    return { user: result };
  } catch (error) {
    return { error };
  }
}
