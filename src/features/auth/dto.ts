import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  return await db.passwordResetToken.findUnique({
    where: { token },
  });
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  const passwordResetToken = await db.passwordResetToken.findFirst({
    where: { email },
  });

  return passwordResetToken;
};

export const deletePasswordResetToken = async (id: string) => {
  return await db.passwordResetToken.delete({
    where: {
      id,
    },
  });
};

// Two Factor Token
export const createTwoFactorConfirmation = async (userID: string) => {
  return await db.twoFactorConfirmation.create({
    data: {
      userId: userID,
    },
  });
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
    where: { userId },
  });

  return twoFactorConfirmation;
};

export const getTwoFactorTokenByToken = async (token: string) => {
  const twoFactorToken = await db.twoFactorToken.findUnique({
    where: { token },
  });

  return twoFactorToken;
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  const twoFactorToken = await db.twoFactorToken.findFirst({
    where: { email },
  });

  return twoFactorToken;
};

export const deleteTwoFactorToken = async (id: string) => {
  return await db.twoFactorToken.delete({
    where: { id },
  });
};

export const deleteTwoFactorConfirmation = async (id: string) => {
  return await db.twoFactorConfirmation.delete({
    where: { id },
  });
};

// Verification Token

export const getVerificationTokenByEmail = async (email: string) => {
  const verificationToken = await db.verificationToken.findFirst({
    where: { email },
  });

  return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  });

  return verificationToken;
};

export const deleteVerificationToken = async (id: string) => {
  return await db.verificationToken.delete({ where: { id } });
};
