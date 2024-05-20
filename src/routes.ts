export const publicRoutes = ["/"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const signInHref = "/auth/sign-in";
export const signUpHref = "/auth/sign-up";
export const forgotPasswordHref = "/auth/forgot-password";
export const authErrorHref = "/auth/error";
export const emailVerificationHref = "/auth/verification";

export const authRoutes = [
  signInHref,
  signUpHref,
  authErrorHref,
  emailVerificationHref,
  forgotPasswordHref,
];
