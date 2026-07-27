// Rotas de Aluno: todas exigem login. Criar/atualizar/remover exigem ser instrutor.
import { Router } from "express";
import { listar, buscarPorId, criar, atualizar, remover } from "../controllers/alunoController";
import { authMiddleware, somenteInstrutor } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listar);
router.get("/:id", authMiddleware, buscarPorId);
router.post("/", somenteInstrutor, criar);
router.put("/:id", somenteInstrutor, atualizar);
router.delete("/:id", somenteInstrutor, remover);

export default router;
