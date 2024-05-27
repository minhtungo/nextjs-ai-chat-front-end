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

export const getUserById = async (id: string | undefined) => {
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

export const getUserAndSettingsById = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({
      where: { id },
      include: { settings: true },
    });
  } catch (error) {
    return null;
  }
};
