import passport from "passport";
import { Strategy as GHStrategy } from "passport-github2";
import * as services from "../services/user.services.js";
import "dotenv/config";

const strategyConfig = {
  clientID: process.env.CLIENT_ID_PG,
  clientSecret: process.env.CLIENT_SECRET_PG,
  callbackURL: "http://localhost:8080/users/profile",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {

    console.log(accessToken);  //Aqui se muestra la informacion del usuario que se logueo
    console.log(refreshToken); //Aqui se muestra la informacion del usuario que se logueo
    console.log(profile);       //Aqui se muestra la informacion del usuario que se logueo

    const email = profile._json.email;
    if (!email) throw new Error("Invalid Email");
    const user = await services.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await services.register({
      name: profile._json.name ? profile._json.name : email,
      email,
      image: profile._json.image || "",
    });
    return done(null, newUser);
  } catch (error) {
    return done(null, error);
  }
};

passport.use("github", new GHStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
  try {
    console.log(user);
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
