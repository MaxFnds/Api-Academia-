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

const app: Application = express();

// View engine: EJS, com os templates em src/views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos: CSS e JS do navegador (public/), fotos enviadas (uploads/)
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/registro", (req, res) => {
  res.render("registro");
});

// Rota raiz temporária, só pra confirmar que o servidor está de pé
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/registro", (req, res) => {
  res.render("registro");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.usuarioId) {
    res.redirect("/login");
    return;
  }
  res.render("dashboard", { tipo: req.session.tipo });
});

// Rotas da API
app.use("/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/instrutores", instrutorRoutes);
app.use("/api/treinos", treinoRoutes);

// 🔜 Próxima etapa vai registrar aqui:
app.use("/api/exercicios", exercicioRoutes);

export default app;