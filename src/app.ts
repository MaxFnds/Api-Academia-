// Configuração central do Express: view engine, middlewares e arquivos estáticos.
// Não sobe servidor aqui — isso é feito em server.ts, que importa este app.

import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import { sessionConfig } from "./config/session";
import authRoutes from "./routes/authRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import instrutorRoutes from "./routes/instrutorRoutes";
import treinoRoutes from "./routes/treinoRoutes";
import exercicioRoutes from "./routes/exercicioRoutes";
import { AlunoRepository } from "./models/AlunoRepository";
import { InstrutorRepository } from "./models/InstrutorRepository";

const app: Application = express();

const alunoRepositoryApp = new AlunoRepository();
const instrutorRepositoryApp = new InstrutorRepository();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Página inicial
app.get("/", (req, res) => {
  if (req.session.usuarioId) {
    res.redirect("/dashboard");
    return;
  }

  res.render("index");
});

// Página de login
app.get("/login", (req, res) => {
  res.render("login");
});

// Página de registro
app.get("/registro", (req, res) => {
  res.render("registro");
});

// Dashboard
app.get("/dashboard", (req, res) => {
  if (!req.session.usuarioId) {
    res.redirect("/login");
    return;
  }

  const usuario =
    req.session.tipo === "aluno"
      ? alunoRepositoryApp.buscarPorId(req.session.usuarioId)
      : instrutorRepositoryApp.buscarPorId(req.session.usuarioId);

  res.render("dashboard", {
    nome: usuario ? usuario.getNome() : "Usuário",
    tipo: req.session.tipo,
  });
});

// Tela de detalhes do treino
app.get("/treinos/:id", (req, res) => {
  if (!req.session.usuarioId) {
    res.redirect("/login");
    return;
  }

  res.render("treino-detalhes");
});

// Tela de criação de treino (somente instrutores)
app.get("/treinos/novo", (req, res) => {
  if (!req.session.usuarioId) {
    res.redirect("/login");
    return;
  }

  if (req.session.tipo !== "instrutor") {
    res.status(403).render("erro", {
      status: 403,
      titulo: "Acesso restrito",
      mensagem: "Apenas instrutores podem criar treinos.",
      destino: "/dashboard",
    });
    return;
  }

  res.render("treino-novo", {
    usuarioId: req.session.usuarioId,
  });
});

// Tela de criação de exercício (somente instrutores)
// Tela de criação de exercício (somente instrutores)
app.get("/exercicios/novo", (req, res) => {
  if (!req.session.usuarioId) {
    res.redirect("/login");
    return;
  }

  if (req.session.tipo !== "instrutor") {
    res.status(403).render("erro", {
      status: 403,
      titulo: "Acesso restrito",
      mensagem: "Apenas instrutores podem cadastrar exercícios.",
      destino: "/dashboard",
    });
    return;
  }

  res.render("exercicio-novo");
});


// Rotas da API
app.use("/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/instrutores", instrutorRoutes);
app.use("/api/treinos", treinoRoutes);
app.use("/api/exercicios", exercicioRoutes);

// Decide se a requisição espera JSON (chamadas da API/front-end) ou uma página HTML
function esperaJson(req: Request): boolean {
  return req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/auth");
}

// ===== 404: rota não encontrada =====
// Fica depois de TODAS as rotas — se nada respondeu até aqui, é 404.
app.use((req: Request, res: Response) => {
  if (esperaJson(req)) {
    res.status(404).json({ erro: "Rota não encontrada." });
    return;
  }

  res.status(404).render("erro", {
    status: 404,
    titulo: "Página não encontrada",
    mensagem: "O endereço que você tentou acessar não existe ou foi movido.",
  });
});

// ===== Erro global (400/500/Multer) =====
// Middleware de erro TEM que ter 4 parâmetros — é assim que o Express reconhece
// que essa função trata erros, e não é uma rota normal. Precisa ser o ÚLTIMO app.use().
app.use((erro: any, req: Request, res: Response, next: NextFunction) => {
  console.error(erro); // loga no servidor pra dar pra investigar depois

  // Erros do Multer (upload de foto): tamanho/tipo errado viram 400 amigável
  if (erro instanceof multer.MulterError || /não permitido/i.test(erro.message || "")) {
    const mensagem =
      erro.code === "LIMIT_FILE_SIZE"
        ? "A imagem enviada é muito grande (máximo 5MB)."
        : erro.message || "Não foi possível processar o arquivo enviado.";

    if (esperaJson(req)) {
      res.status(400).json({ erro: mensagem });
      return;
    }

    res.status(400).render("erro", { status: 400, titulo: "Requisição inválida", mensagem });
    return;
  }

  // Qualquer outro erro não tratado vira 500
  if (esperaJson(req)) {
    res.status(500).json({ erro: "Erro interno no servidor." });
    return;
  }

  res.status(500).render("erro", {
    status: 500,
    titulo: "Algo deu errado",
    mensagem: "Ocorreu um erro inesperado. Tente novamente em instantes.",
  });
});

export default app;
