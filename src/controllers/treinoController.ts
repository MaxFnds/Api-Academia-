import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Treino } from "../entities/Treino";
import { TreinoRepository } from "../models/TreinoRepository";
import { AlunoRepository } from "../models/AlunoRepository";
import { InstrutorRepository } from "../models/InstrutorRepository";
import { ExercicioRepository } from "../models/ExercicioRepository";

const treinoRepository = new TreinoRepository();
const alunoRepository = new AlunoRepository();
const instrutorRepository = new InstrutorRepository();
const exercicioRepository = new ExercicioRepository();

// GET /api/treinos
// Se logado como aluno, mostra só os treinos dele. Se instrutor, mostra todos.
export function listar(req: Request, res: Response): void {
  if (req.session.tipo === "aluno") {
    const treinos = treinoRepository.buscarPorAlunoId(req.session.usuarioId!);
    res.status(200).json(treinos.map((t) => t.toJSON()));
    return;
  }

  const treinos = treinoRepository.listar();
  res.status(200).json(treinos.map((t) => t.toJSON()));
}

// GET /api/treinos/:id
export function buscarPorId(req: Request, res: Response): void {
  const { id } = req.params;
  const treino = treinoRepository.buscarPorId(id);

  if (!treino) {
    res.status(404).json({ erro: "Treino não encontrado." });
    return;
  }

  res.status(200).json(treino.toJSON());
}

// POST /api/treinos
export function criar(req: Request, res: Response): void {
  try {
    const { nome, alunoId, instrutorId, exercicios } = req.body;

    // Valida se o aluno referenciado realmente existe
    const alunoExiste = alunoRepository.buscarPorId(alunoId);
    if (!alunoExiste) {
      res.status(400).json({ erro: "O aluno informado não existe." });
      return;
    }

    // Valida se o instrutor referenciado realmente existe
    const instrutorExiste = instrutorRepository.buscarPorId(instrutorId);
    if (!instrutorExiste) {
      res.status(400).json({ erro: "O instrutor informado não existe." });
      return;
    }

    // Valida se todos os exercícios referenciados realmente existem
    const listaExercicios: string[] = exercicios || [];
    for (const exercicioId of listaExercicios) {
      const exercicioExiste = exercicioRepository.buscarPorId(exercicioId);
      if (!exercicioExiste) {
        res.status(400).json({ erro: `O exercício ${exercicioId} não existe.` });
        return;
      }
    }

    const id = uuidv4();
    const novoTreino = new Treino(id, nome, alunoId, instrutorId, listaExercicios, new Date().toISOString());
    treinoRepository.criar(novoTreino);

    res.status(201).json(novoTreino.toJSON());

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível criar o treino." });
  }
}

// PUT /api/treinos/:id
export function atualizar(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const treinoExistente = treinoRepository.buscarPorId(id);

    if (!treinoExistente) {
      res.status(404).json({ erro: "Treino não encontrado." });
      return;
    }

    const { nome } = req.body;
    if (nome) treinoExistente.setNome(nome);

    treinoRepository.atualizar(id, treinoExistente);
    res.status(200).json(treinoExistente.toJSON());

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível atualizar o treino." });
  }
}

// DELETE /api/treinos/:id
export function remover(req: Request, res: Response): void {
  const { id } = req.params;
  const removeu = treinoRepository.remover(id);

  if (!removeu) {
    res.status(404).json({ erro: "Treino não encontrado." });
    return;
  }

  res.status(200).json({ mensagem: "Treino removido com sucesso." });
}

// PATCH /api/treinos/:id/exercicios
// Rota específica para adicionar/remover exercícios de um treino já existente,
// usando os métodos adicionarExercicio/removerExercicio que já existem na entidade Treino.
export function gerenciarExercicio(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const { exercicioId, acao } = req.body; // acao: "adicionar" ou "remover"

    const treino = treinoRepository.buscarPorId(id);
    if (!treino) {
      res.status(404).json({ erro: "Treino não encontrado." });
      return;
    }

    if (acao === "adicionar") {
      const exercicioExiste = exercicioRepository.buscarPorId(exercicioId);
      if (!exercicioExiste) {
        res.status(400).json({ erro: "O exercício informado não existe." });
        return;
      }
      treino.adicionarExercicio(exercicioId);
    } else if (acao === "remover") {
      treino.removerExercicio(exercicioId);
    } else {
      res.status(400).json({ erro: "A ação deve ser 'adicionar' ou 'remover'." });
      return;
    }

    treinoRepository.atualizar(id, treino);
    res.status(200).json(treino.toJSON());

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível gerenciar o exercício." });
  }
}
