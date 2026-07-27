// Rotas de Instrutor: listar exige login; criar/editar/remover exige ser instrutor
// (só instrutor gerencia outro instrutor — ninguém de fora cadastra instrutor livremente).
import { Router } from "express";
import { listar, buscarPorId, criar, atualizar, remover } from "../controllers/instrutorController";
import { authMiddleware, somenteInstrutor } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listar);
router.get("/:id", authMiddleware, buscarPorId);
router.post("/", somenteInstrutor, criar);
router.put("/:id", somenteInstrutor, atualizar);
router.delete("/:id", somenteInstrutor, remover);

export default router;
