import { signIn } from "@/auth";
import {
  createTwoFactorConfirmation,
  deletePasswordResetToken,
  deleteTwoFactorConfirmation,
  deleteTwoFactorToken,
  deleteVerificationToken,
  getPasswordResetTokenByToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/auth";
import {
  createUser,
  getUserByEmail,
  setNewUserPassword,
  updateUserEmailVerification,
} from "@/data/user";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/definitions";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";

import { AuthError } from "next-auth";
import { z } from "zod";
import { ZSAError } from "zsa";
import { afterLoginUrl } from "@/app-config";
import {
  comparePassword,
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
  saltAndHashPassword,
} from "@/lib/security";
import { ApiResponse } from "@/lib/response";

export const signInWithCredentialsUseCase = async ({
  values,
  redirectURL,
}: {
  values: z.infer<typeof signInSchema>;
  redirectURL: string | null;
}) => {
  const { email, password, code } = values;

  const existingUser = await getUserByEmail(email, {
    omit: {
      password: false,
    },
    include: {
      settings: true,
    },
  });

  if (
    !existingUser ||
    !existingUser.email ||
    !existingUser.password ||
    !existingUser.emailVerified
  ) {
    throw new ZSAError("NOT_AUTHORIZED", "error.invalidCredentials");
  }

  if (existingUser.settings?.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        throw new ZSAError("NOT_AUTHORIZED", "error.tokenInvalid");
      }

      if (twoFactorToken.token !== code) {
        throw new ZSAError("NOT_AUTHORIZED", "error.invalidCode");
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        throw new ZSAError("NOT_AUTHORIZED", "error.expiredCode");
      }

      await deleteTwoFactorToken(twoFactorToken.id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await deleteTwoFactorConfirmation(existingConfirmation.id);
      }

      await createTwoFactorConfirmation(existingUser.id);
    } else {
      const passwordMatch = await comparePassword(
        password,
        existingUser.password,
      );

      if (!passwordMatch) {
        throw new ZSAError("NOT_AUTHORIZED", "error.invalidCredentials");
      }

      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectURL || afterLoginUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new ZSAError("NOT_AUTHORIZED", "error.invalidCredentials");

        default:
          throw new ZSAError("NOT_AUTHORIZED", "error.generalError");
      }
    }

    throw error;
  }
};

export const signUpWithCredentialsUseCase = async (
  values: z.infer<typeof signUpSchema>,
) => {
  const { email, password, name } = values;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (!existingUser.emailVerified) {
      await generateVerificationToken(existingUser.email);
      return {
        message: "success.signUp",
      };
    }

    throw new ZSAError("CONFLICT", "error.emailInUse");
  }

  const hashedPassword = await saltAndHashPassword(password);

  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { message: "success.signUp" };
};

export const verifyNewUserEmailUseCase = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    throw new ZSAError("NOT_AUTHORIZED", "error.tokenInvalid");
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    throw new ZSAError("NOT_AUTHORIZED", "error.tokenExpired");
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    throw new ZSAError("NOT_AUTHORIZED", "error.invalidVerificationEmail");
  }

  console.log("existingUser", existingUser);

  try {
    await updateUserEmailVerification(existingUser.id);
    await deleteVerificationToken(existingToken.id);
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }

  return ApiResponse.success("success.emailVerified", {
    email: existingUser.email,
  });
};

export const forgotPasswordUseCase = async (
  values: z.infer<typeof forgotPasswordSchema>,
) => {
  const { email } = values;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new ZSAError("NOT_AUTHORIZED", "error.invalidVerificationEmail");
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }

  return {
    message: "success.resetPasswordEmailSent",
  };
};

export const setNewPasswordUseCase = async ({
  values,
  token,
}: {
  values: z.infer<typeof resetPasswordSchema>;
  token: string;
}) => {
  const { password } = values;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    throw new ZSAError("NOT_AUTHORIZED", "error.tokenInvalid");
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    throw new ZSAError("NOT_AUTHORIZED", "error.tokenExpired");
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    throw new ZSAError("NOT_AUTHORIZED", "error.invalidVerificationEmail");
  }

  try {
    await setNewUserPassword({
      id: existingUser.id,
      password,
    });

    await deletePasswordResetToken(existingToken.id);
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }

  return { message: "success.passwordChanged" };
};

export const sendVerificationEmailUseCase = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    throw new ZSAError("NOT_AUTHORIZED", "error.tokenInvalid");
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) throw new ZSAError("NOT_AUTHORIZED", "error.invalidEmail");

  if (user.emailVerified)
    throw new ZSAError("CONFLICT", "error.alreadyVerified");

  const newToken = await generateVerificationToken(user.email);

  await sendVerificationEmail(newToken.email, newToken.token);

  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }
};
