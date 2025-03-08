import { userDao } from "../manager/user.manager.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js";

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await userDao.getByEmail(email);
    if (existUser) throw new Error("User already exist");
    if (email === "adminCoder@coder" && password === "adminCod3r123") {
      return await userDao.register({
        ...user,
        password: createHash(password),
        role: "admin",
      });
    }
    return await userDao.register({
      ...user,
      password: createHash(password),
    });
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userExist = await userDao.getByEmail(email);
    if (!userExist) throw new Error("User not exist");
    const passValid = isValidPassword(password, userExist);
    if(!passValid) throw new Error("Password incorrect");
    return userExist;
  } catch (error) {
    throw error;
  }
};
