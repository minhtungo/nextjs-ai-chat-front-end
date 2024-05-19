import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const createUser = async (user: User) => {
  return await db.user.create({
    data: user,
  });
};
