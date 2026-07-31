// Repository do Treino: única camada responsável por ler e escrever no arquivo dados/treinos.json.
// Nenhuma outra parte do sistema deve acessar o arquivo JSON diretamente.
import fs from "fs";
import path from "path";
import { Treino } from "../entities/Treino";

const CAMINHO_ARQUIVO = path.join(__dirname, "..", "..", "dados", "treinos.json");

export class TreinoRepository {

  private lerArquivo(): any[] {
  const buffer = fs.readFileSync(CAMINHO_ARQUIVO);

  // Detecta BOM de UTF-16 (LE ou BE) e converte corretamente.
  // Isso evita o erro "Unexpected token" caso o arquivo tenha sido
  // salvo por algum editor (ex: Bloco de Notas do Windows) em UTF-16.
  let conteudo: string;

  if (buffer[0] === 0xff && buffer[1] === 0xfe) {
    conteudo = buffer.toString("utf16le");
  } else if (buffer[0] === 0xfe && buffer[1] === 0xff) {
    conteudo = buffer.swap16().toString("utf16le");
  } else {
    conteudo = buffer.toString("utf-8");
  }

  conteudo = conteudo.replace(/^\uFEFF/, "");

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

  // Retorna um treino pelo id, ou null se não existir
  public buscarPorId(id: string): Treino | null {
    const dados = this.lerArquivo();
    const item = dados.find((item) => item.id === id);
    return item ? Treino.fromJSON(item) : null;
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

  // Substitui os dados de um treino existente. Retorna null se o id não existir.
  public atualizar(id: string, treinoAtualizado: Treino): Treino | null {
    const dados = this.lerArquivo();
    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    dados[indice] = treinoAtualizado.toJSON();
    this.escreverArquivo(dados);
    return treinoAtualizado;
  }

  // Remove um treino pelo id. Retorna true se removeu, false se não encontrou.
  public remover(id: string): boolean {
    const dados = this.lerArquivo();
    const tamanhoAntes = dados.length;
    const dadosFiltrados = dados.filter((item) => item.id !== id);

    if (dadosFiltrados.length === tamanhoAntes) {
      return false; // nada foi removido, id não existia
    }

    this.escreverArquivo(dadosFiltrados);
    return true;
  }
}