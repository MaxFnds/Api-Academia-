// Configuração central do Express: view engine, middlewares e arquivos estáticos.
// Não sobe servidor aqui — isso é feito em server.ts, que importa este app.
import express, { Application } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";

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

// Rota raiz temporária, só pra confirmar que o servidor está de pé
// (vai virar a tela de login/dashboard de verdade quando as views forem preenchidas)
app.get("/", (req, res) => {
  res.render("index", { titulo: "FitWeb" });
});

app.use("/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/instrutores", instrutorRoutes);

export default app;