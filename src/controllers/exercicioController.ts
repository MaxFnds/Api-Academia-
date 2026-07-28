// Controller de Exercicio: o CRUD mais simples, sem referências a validar.
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Exercicio } from "../entities/Exercicio";
import { ExercicioRepository } from "../models/ExercicioRepository";

const exercicioRepository = new ExercicioRepository();

// GET /api/exercicios
export function listar(req: Request, res: Response): void {
  const exercicios = exercicioRepository.listar();
  res.status(200).json(exercicios.map((e) => e.toJSON()));
}

// GET /api/exercicios/:id
export function buscarPorId(req: Request<{ id: string }>, res: Response): void {
  const { id } = req.params;
  const exercicio = exercicioRepository.buscarPorId(id);

  if (!exercicio) {
    res.status(404).json({ erro: "Exercício não encontrado." });
    return;
  }

  res.status(200).json(exercicio.toJSON());
}

// POST /api/exercicios
export function criar(req: Request, res: Response): void {
  try {
    const { nome, series, repeticoes } = req.body;
    const id = uuidv4();

    const novoExercicio = new Exercicio(id, nome, series, repeticoes);
    exercicioRepository.criar(novoExercicio);

    res.status(201).json(novoExercicio.toJSON());

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível criar o exercício." });
  }
}

// PUT /api/exercicios/:id
export function atualizar(req: Request<{ id: string }>, res: Response): void {
  try {
    const { id } = req.params;
    const exercicioExistente = exercicioRepository.buscarPorId(id);

    if (!exercicioExistente) {
      res.status(404).json({ erro: "Exercício não encontrado." });
      return;
    }

    const { nome, series, repeticoes } = req.body;

    if (nome) exercicioExistente.setNome(nome);
    if (series) exercicioExistente.setSeries(series);
    if (repeticoes) exercicioExistente.setRepeticoes(repeticoes);

    exercicioRepository.atualizar(id, exercicioExistente);
    res.status(200).json(exercicioExistente.toJSON());

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível atualizar o exercício." });
  }
}

// DELETE /api/exercicios/:id
export function remover(req: Request<{ id: string }>, res: Response): void {
  const { id } = req.params;
  const removeu = exercicioRepository.remover(id);

  if (!removeu) {
    res.status(404).json({ erro: "Exercício não encontrado." });
    return;
  }

  res.status(200).json({ mensagem: "Exercício removido com sucesso." });
}

// PATCH /api/exercicios/:id/concluir
// Rota específica pra marcar um exercício como concluído/não concluído — usada pelo fetch API no front-end,
// já que essa é a operação que o ALUNO faz com mais frequência (não precisa ser instrutor pra isso).
export function alternarConcluido(req: Request<{ id: string }>, res: Response): void {
  const { id } = req.params;
  const exercicio = exercicioRepository.buscarPorId(id);

  if (!exercicio) {
    res.status(404).json({ erro: "Exercício não encontrado." });
    return;
  }

  exercicio.setConcluido(!exercicio.getConcluido());
  exercicioRepository.atualizar(id, exercicio);

  res.status(200).json(exercicio.toJSON());
}