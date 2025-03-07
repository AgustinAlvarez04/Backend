import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/errorRegister", (req, res) => {
  res.render("errorRegister");
});

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/perfil", (req, res) => {
  res.render("perfil");
  console.log(req.session);
});

export default router;
