// Middleware de proteção de rotas: bloqueia o acesso de quem não está logado.
// Uso: colocar como segundo parâmetro da rota, ex: router.get("/perfil", authMiddleware, minhaFuncao)
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.usuarioId) {
    res.status(401).json({ erro: "Você precisa estar logado para acessar este recurso." });
    return;
  }

  // Usuário está logado, pode seguir para a rota/controller de verdade
  next();
}

// Middleware extra: além de estar logado, exige que seja um instrutor
// Uso: em rotas que só instrutores podem acessar (ex: criar treino, remover aluno)
export function somenteInstrutor(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.usuarioId) {
    res.status(401).json({ erro: "Você precisa estar logado para acessar este recurso." });
    return;
  }

  if (req.session.tipo !== "instrutor") {
    res.status(403).json({ erro: "Apenas instrutores podem realizar esta ação." });
    return;
  }

  next();
}
