// Controller de Instrutor: mesmo padrão do alunoController.
import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Instrutor } from "../entities/Instrutor";
import { InstrutorRepository } from "../models/InstrutorRepository";

const instrutorRepository = new InstrutorRepository();

// GET /api/instrutores
export const listar: RequestHandler = (req, res) => {
  const instrutores = instrutorRepository.listar();
  const semSenha = instrutores.map((instrutor) => {
    const dados: any = instrutor.toJSON();
    delete dados.senha;
    return dados;
  });

  res.status(200).json(semSenha);
};

// GET /api/instrutores/:id
export const buscarPorId: RequestHandler<{ id: string }> = (req, res) => {
  const { id } = req.params;
  const instrutor = instrutorRepository.buscarPorId(id);

  if (!instrutor) {
    res.status(404).json({ erro: "Instrutor não encontrado." });
    return;
  }

  const dados: any = instrutor.toJSON();
  delete dados.senha;
  res.status(200).json(dados);
};

// POST /api/instrutores
export const criar: RequestHandler = async (req, res) => {
  try {
    const { nome, email, senha, especialidade } = req.body;
    const id = uuidv4();
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoInstrutor = new Instrutor(id, nome, email, senhaHash, especialidade);
    instrutorRepository.criar(novoInstrutor);

    const dados: any = novoInstrutor.toJSON();
    delete dados.senha;
    res.status(201).json(dados);

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível criar o instrutor." });
  }
};

// PUT /api/instrutores/:id
export const atualizar: RequestHandler<{ id: string }> = (req, res) => {
  try {
    const { id } = req.params;
    const instrutorExistente = instrutorRepository.buscarPorId(id);

    if (!instrutorExistente) {
      res.status(404).json({ erro: "Instrutor não encontrado." });
      return;
    }

    const { nome, email, especialidade } = req.body;

    if (nome) instrutorExistente.setNome(nome);
    if (email) instrutorExistente.setEmail(email);
    if (especialidade) instrutorExistente.setEspecialidade(especialidade);

    instrutorRepository.atualizar(id, instrutorExistente);

    const dados: any = instrutorExistente.toJSON();
    delete dados.senha;
    res.status(200).json(dados);

  } catch (erro: any) {
    res.status(400).json({ erro: erro.message || "Não foi possível atualizar o instrutor." });
  }
};

// DELETE /api/instrutores/:id
export const remover: RequestHandler<{ id: string }> = (req, res) => {
  const { id } = req.params;
  const removeu = instrutorRepository.remover(id);

  if (!removeu) {
    res.status(404).json({ erro: "Instrutor não encontrado." });
    return;
  }

  res.status(200).json({ mensagem: "Instrutor removido com sucesso." });
};