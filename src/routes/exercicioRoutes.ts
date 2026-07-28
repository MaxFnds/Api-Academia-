// Rotas de Exercicio: listar/ver exige login; criar/editar/remover exige ser instrutor;
// marcar como concluído é permitido pra qualquer usuário logado (é o aluno quem faz isso na prática).
import { Router } from "express";
import {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  alternarConcluido,
} from "../controllers/exercicioController";
import { authMiddleware, somenteInstrutor } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listar);
router.get("/:id", authMiddleware, buscarPorId);
router.post("/", somenteInstrutor, criar);
router.put("/:id", somenteInstrutor, atualizar);
router.delete("/:id", somenteInstrutor, remover);
router.patch("/:id/concluir", authMiddleware, alternarConcluido);

export default router;
