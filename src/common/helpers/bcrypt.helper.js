import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const encodeString = (password) => {
  const SALT = genSaltSync(10);
  return hashSync(password, SALT);
};

export const compareString = (string, hashString) => {
  return compareSync(string, hashString);
};
