// Configuração central da sessão (express-session).
// Centralizar aqui evita repetir essas opções em outros arquivos e facilita ajustar depois.
import session from "express-session";

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "fitweb-segredo-desenvolvimento",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // sessão dura 24 horas
    httpOnly: true,
  },
});
