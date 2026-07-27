import { Router } from "express";
import {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  gerenciarExercicio,
} from "../controllers/treinoController";
import { authMiddleware, somenteInstrutor } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listar);
router.get("/:id", authMiddleware, buscarPorId);
router.post("/", somenteInstrutor, criar);
router.put("/:id", somenteInstrutor, atualizar);
router.delete("/:id", somenteInstrutor, remover);
router.patch("/:id/exercicios", somenteInstrutor, gerenciarExercicio);

export default router;
