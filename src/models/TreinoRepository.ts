// Repository do Treino: única camada responsável por ler e escrever no arquivo dados/treinos.json.
// Nenhuma outra parte do sistema deve acessar o arquivo JSON diretamente.
import fs from "fs";
import path from "path";
import { Treino } from "../entities/Treino";

const CAMINHO_ARQUIVO = path.join(__dirname, "..", "..", "dados", "treinos.json");

export class TreinoRepository {

  private lerArquivo(): any[] {
    const conteudo = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
    return JSON.parse(conteudo);
  }

  private escreverArquivo(dados: any[]): void {
    fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), "utf-8");
  }

  // Retorna todos os treinos já convertidos em instâncias da classe Treino
  public listar(): Treino[] {
    const dados = this.lerArquivo();
    return dados.map((item) => Treino.fromJSON(item));
  }
    // Retorna todos os treinos vinculados a um aluno específico
  // (vai ser usado na tela "meus treinos" do aluno logado)
  public buscarPorAlunoId(alunoId: string): Treino[] {
    const treinos = this.listar();
    return treinos.filter((treino) => treino.getAlunoId() === alunoId);
  }

  // Retorna todos os treinos criados por um instrutor específico
  // (vai ser usado na tela "treinos que eu criei" do instrutor logado)
  public buscarPorInstrutorId(instrutorId: string): Treino[] {
    const treinos = this.listar();
    return treinos.filter((treino) => treino.getInstrutorId() === instrutorId);
  }

  // Adiciona um novo treino ao arquivo
  public criar(treino: Treino): Treino {
    const dados = this.lerArquivo();
    dados.push(treino.toJSON());
    this.escreverArquivo(dados);
    return treino;
  }

