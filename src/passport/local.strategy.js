import passport from "passport";
import { Strategy } from "passport-local";
import * as services from "../services/user.services.js";

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
    const user = await services.getByEmail(email);
    if (user) return done(null, false, { messages: "User already exist" });
    const newUser = await services.register(req.body);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const userLogin = await services.login(email, password);
    if (!userLogin) return done(null, false, { msg: "Error Auth" });
    return done(null, userLogin);
  } catch (error) {
    return done(null, false, { msg: error.messages });
  }
};

const registerStrategy = new Strategy(strategyConfig, register);
const loginStrategy = new Strategy(strategyConfig, login);

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    return done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await services.getById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
