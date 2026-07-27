// Controller de Aluno: recebe a requisição, chama o repository, devolve a resposta.
// Não tem lógica de negócio pesada aqui — isso já mora nas entidades (validação) e no repository (persistência).
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Aluno } from "../entities/Aluno";
import { AlunoRepository } from "../models/AlunoRepository";
import bcrypt from "bcrypt";

const alunoRepository = new AlunoRepository();

// GET /api/alunos
export function listar(req: Request, res: Response): void {
  const alunos = alunoRepository.listar();
  const alunosSemSenha = alunos.map((aluno) => {
    const dados: any = aluno.toJSON();
    delete dados.senha; // nunca devolver o hash da senha pro front-end
    return dados;
  });

  res.status(200).json(alunosSemSenha);
}

// GET /api/alunos/:id
export function buscarPorId(req: Request<{ id: string }>, res: Response): void {
  const { id } = req.params;
  const aluno = alunoRepository.buscarPorId(id);

  if (!aluno) {
    res.status(404).json({ erro: "Aluno não encontrado." });
    return;
  }

  const dados: any = aluno.toJSON();
  delete dados.senha;
  res.status(200).json(dados);
}

// POST /api/alunos
// Diferente do /auth/registro: essa rota é usada por um instrutor para cadastrar um aluno manualmente
// (sem o aluno precisar se autoregistrar). Por isso ainda pede uma senha inicial.
export async function criar(req: Request, res: Response): Promise<void> {
  try {
    const { nome, email, senha, idade } = req.body;
    const id = uuidv4();
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoAluno = new Aluno(id, nome, email, senhaHash, new Date().toISOString(), idade);
    alunoRepository.criar(novoAluno);

    const dados: any = novoAluno.toJSON();
    delete dados.senha;
    res.status(201).json(dados);

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível criar o aluno." });
  }
}

// PUT /api/alunos/:id
export function atualizar(req: Request<{ id: string }>, res: Response): void {
  try {
    const { id } = req.params;
    const alunoExistente = alunoRepository.buscarPorId(id);

    if (!alunoExistente) {
      res.status(404).json({ erro: "Aluno não encontrado." });
      return;
    }

    const { nome, email, idade } = req.body;

    if (nome) alunoExistente.setNome(nome);
    if (email) alunoExistente.setEmail(email);
    if (idade) alunoExistente.setIdade(idade);

    alunoRepository.atualizar(id, alunoExistente);

    const dados: any = alunoExistente.toJSON();
    delete dados.senha;
    res.status(200).json(dados);

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível atualizar o aluno." });
  }
}

// DELETE /api/alunos/:id
export function remover(req: Request<{ id: string }>, res: Response): void {
  const { id } = req.params;
  const removeu = alunoRepository.remover(id);

  if (!removeu) {
    res.status(404).json({ erro: "Aluno não encontrado." });
    return;
  }

  res.status(200).json({ mensagem: "Aluno removido com sucesso." });
}