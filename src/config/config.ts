export const LANGUAGES = [
  {
    title: "Tiếng việt",
    locale: "vi",
  },
  {
    title: "English",
    locale: "en",
  },
];

export const apiAuthPrefix = "/api";
export const afterLoginUrl = "/chat";
export const signInUrl = "/sign-in";
export const signUpUrl = "/sign-up";
export const forgotPasswordUrl = "/forgot-password";
export const authErrorUrl = "/error";
export const emailVerificationUrl = "/verification";
export const resetPasswordUrl = "/reset-password";
export const onboardingUrl = "/onboarding";
export const subscriptionUrl = "/subscription";

export const cookie = {
  chat: {
    token: "x-chat-token",
    userId: "x-chat-user-id",
    expires: 60 * 1000 * 60 * 24 * 7,
  },
};

export const chatUrl = "/chat";
export const accountUrl = "/account";
export const adminUrl = "/admin";

export const publicRoutes = [
  "/",
  "/pricing",
  "/about",
  "/contact-us",
  "/privacy-policy",
  "/terms",
  "/chat",
];

export const authRoutes = [
  signInUrl,
  signUpUrl,
  authErrorUrl,
  emailVerificationUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
];

export const ADMIN_EMAIL = "onboarding@resend.dev";

export const MAX_UPLOAD_FILE_SIZE_IN_MB = 10;
export const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * MAX_UPLOAD_FILE_SIZE_IN_MB;
export const MAX_UPLOAD_FILE_COUNT = 10;

export const EXPIRY_PERIOD = 1800 * 1000;

export const TOKEN_EXPIRATION_IN_MINUTES = 60;
export const TOKEN_EXPIRATION = TOKEN_EXPIRATION_IN_MINUTES * 60;

export const MESSAGE_TOKEN_LIMIT = 10;

export const MESSAGES_LIMIT = 20;
