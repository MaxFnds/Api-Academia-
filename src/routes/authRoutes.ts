// Rotas de autenticação: registro, login e logout.
// Aqui só conectamos URL + método HTTP com a função do controller — sem lógica de negócio.
import { Router } from "express";
import { registrar, login, logout } from "../controllers/authController";

const router = Router();

router.post("/registro", registrar);
router.post("/login", login);
router.post("/logout", logout);

export default router;
