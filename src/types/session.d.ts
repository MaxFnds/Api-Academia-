// Estende o tipo padrão do express-session, adicionando os campos
// que o FitWeb guarda na sessão do usuário logado.
import "express-session";

declare module "express-session" {
  interface SessionData {
    usuarioId: string;
    tipo: "aluno" | "instrutor";
  }
}
