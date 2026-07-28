// Rotas de Aluno: todas exigem login. Criar/atualizar/remover exigem ser instrutor.
import { Router } from "express";
import { listar, buscarPorId, criar, atualizar, remover, atualizarFoto } from "../controllers/alunoController";
import { authMiddleware, somenteInstrutor } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listar);
router.get("/:id", authMiddleware, buscarPorId);
router.post("/", somenteInstrutor, criar);
router.put("/:id", somenteInstrutor, atualizar);
router.delete("/:id", somenteInstrutor, remover);

export default router;
router.patch("/:id/foto", authMiddleware, upload.single("foto"), atualizarFoto);

import { Router } from "express";
import { listar, buscarPorId, criar, atualizar, remover, atualizarFoto } from "../controllers/alunoController";
import { authMiddleware, somenteInstrutor } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/", authMiddleware, listar);
router.get("/:id", authMiddleware, buscarPorId);
router.post("/", somenteInstrutor, criar);
router.put("/:id", somenteInstrutor, atualizar);
router.delete("/:id", somenteInstrutor, remover);
router.patch("/:id/foto", authMiddleware, upload.single("foto"), atualizarFoto);

export default router;
