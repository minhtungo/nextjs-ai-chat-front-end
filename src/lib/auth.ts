import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  inputPassword: string,
  userPassword: string,
) => {
  return await bcrypt.compare(inputPassword, userPassword);
};
