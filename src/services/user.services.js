import { userDao } from "../manager/user.manager.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await userDao.getByEmail(email);
    if (existUser) throw new Error("User already exist");
    return await userDao.register({
      ...user,
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
    if (!passValid) throw new Error("Password incorrect");
    return userExist;
  } catch (error) {
    throw error;
  }
};

export const getByEmail = async (email) => {
  try {
    return await userDao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    const user = await userDao.getById(id);
    if (!user) throw new Error("User not exist");
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
