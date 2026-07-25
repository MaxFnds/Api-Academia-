"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Configuração central do Express: view engine, middlewares e arquivos estáticos.
// Não sobe servidor aqui — isso é feito em server.ts, que importa este app.
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// View engine: EJS, com os templates em src/views
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// Middlewares globais
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Arquivos estáticos: CSS e JS do navegador (public/), fotos enviadas (uploads/)
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
// Rota raiz temporária, só pra confirmar que o servidor está de pé
// (vai virar a tela de login/dashboard de verdade quando as views forem preenchidas)
app.get("/", (req, res) => {
    res.render("index", { titulo: "FitWeb" });
});
// 🔜 Próximas etapas vão registrar as rotas reais aqui, por exemplo:
// app.use("/auth", authRoutes);
// app.use("/api/alunos", alunoRoutes);
// app.use("/api/instrutores", instrutorRoutes);
// app.use("/api/treinos", treinoRoutes);
exports.default = app;
//# sourceMappingURL=app.js.map