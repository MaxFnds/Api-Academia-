// Configuração central do Express: view engine, middlewares e arquivos estáticos.
// Não sobe servidor aqui — isso é feito em server.ts, que importa este app.

import express, { Application } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
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
    res.redirect("/dashboard");
    return;
  }

  res.render("treino-novo", {
    usuarioId: req.session.usuarioId,
  });
});

// Rotas da API
app.use("/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/instrutores", instrutorRoutes);
app.use("/api/treinos", treinoRoutes);
app.use("/api/exercicios", exercicioRoutes);

export default app;