export const getUserFromDb = async (email: string, pwHash: string) => {
  return {
    id: "test-user-1",
    userName: "test1",
    name: "Test 1",
    password: pwHash,
    email,
  };
};
