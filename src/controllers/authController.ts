// Controller de autenticação: registro, login e logout.
// Um usuário pode se registrar como Aluno ou como Instrutor — o campo "tipo" no corpo da requisição decide qual.
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Aluno } from "../entities/Aluno";
import { Instrutor } from "../entities/Instrutor";
import { AlunoRepository } from "../models/AlunoRepository";
import { InstrutorRepository } from "../models/InstrutorRepository";

const alunoRepository = new AlunoRepository();
const instrutorRepository = new InstrutorRepository();

const SALT_ROUNDS = 10; // custo do hash do bcrypt — 10 é o padrão recomendado (equilíbrio entre segurança e velocidade)

// POST /auth/registro
export async function registrar(req: Request, res: Response): Promise<void> {
  try {
    const { nome, senha, tipo, idade, especialidade } = req.body;

    // Normaliza o email (tira espaços nas pontas e deixa tudo minúsculo) — evita que
    // "Joao@Email.com" e "joao@email.com" sejam tratados como contas diferentes,
    // e evita falha de login por causa de maiúscula/minúscula ou espaço a mais.
    const email = (req.body.email || "").trim().toLowerCase();

    if (!tipo || (tipo !== "aluno" && tipo !== "instrutor")) {
      res.status(400).json({ erro: "O campo 'tipo' deve ser 'aluno' ou 'instrutor'." });
      return;
    }

    // Verifica se o email já está em uso (em qualquer um dos dois repositories)
    const emailJaExisteAluno = alunoRepository.buscarPorEmail(email);
    const emailJaExisteInstrutor = instrutorRepository.buscarPorEmail(email);

    if (emailJaExisteAluno || emailJaExisteInstrutor) {
      res.status(400).json({ erro: "Este email já está cadastrado." });
      return;
    }

    // Gera o hash da senha — NUNCA salvar a senha em texto puro
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    const id = uuidv4();

    if (tipo === "aluno") {
      const novoAluno = new Aluno(id, nome, email, senhaHash, new Date().toISOString(), idade);
      alunoRepository.criar(novoAluno);
      res.status(201).json({ mensagem: "Aluno registrado com sucesso.", id });
      return;
    }

    // tipo === "instrutor"
    const novoInstrutor = new Instrutor(id, nome, email, senhaHash, especialidade);
    instrutorRepository.criar(novoInstrutor);
    res.status(201).json({ mensagem: "Instrutor registrado com sucesso.", id });

  } catch (erro: any) {
    // Erros de validação lançados pelas entidades (ex: "Email inválido.") caem aqui
    res.status(400).json({ erro: erro.message || "Não foi possível registrar." });
  }
}

// POST /auth/login
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { senha } = req.body;
    const email = (req.body.email || "").trim().toLowerCase();

    if (!email || !senha) {
      res.status(400).json({ erro: "Email e senha são obrigatórios." });
      return;
    }

    // Procura primeiro entre os alunos, depois entre os instrutores
    const aluno = alunoRepository.buscarPorEmail(email);
    const instrutor = aluno ? null : instrutorRepository.buscarPorEmail(email);

    const usuarioEncontrado = aluno || instrutor;

    if (!usuarioEncontrado) {
      res.status(401).json({ erro: "Email ou senha inválidos." });
      return;
    }

    // Compara a senha digitada com o hash salvo
    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.getSenha());

    if (!senhaCorreta) {
      res.status(401).json({ erro: "Email ou senha inválidos." });
      return;
    }

    // Salva os dados essenciais na sessão
    req.session.usuarioId = usuarioEncontrado.getId();
    req.session.tipo = aluno ? "aluno" : "instrutor";

    res.status(200).json({
      mensagem: "Login realizado com sucesso.",
      tipo: req.session.tipo,
      nome: usuarioEncontrado.getNome(),
    });

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível fazer login." });
  }
}

// POST /auth/logout
export function logout(req: Request, res: Response): void {
  req.session.destroy((erro) => {
    if (erro) {
      res.status(500).json({ erro: "Não foi possível encerrar a sessão." });
      return;
    }
    res.status(200).json({ mensagem: "Logout realizado com sucesso." });
  });
}