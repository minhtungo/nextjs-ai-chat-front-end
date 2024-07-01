import { Account, Subject, User, UserSettings } from "@prisma/client";

export type UserProfileProps = Omit<User, "password"> & {
  settings: UserSettings | null;
  accounts: Account | null;
  subjects: Subject[] | null;
};
