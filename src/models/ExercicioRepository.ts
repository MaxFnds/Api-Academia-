// Repository do Exercicio: única camada responsável por ler e escrever no arquivo dados/exercicios.json.
import fs from "fs";
import path from "path";
import { Exercicio } from "../entities/Exercicio";

const CAMINHO_ARQUIVO = path.join(__dirname, "..", "..", "dados", "exercicios.json");

export class ExercicioRepository {

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

  public listar(): Exercicio[] {
    const dados = this.lerArquivo();
    return dados.map((item) => Exercicio.fromJSON(item));
  }

  public buscarPorId(id: string): Exercicio | null {
    const exercicios = this.listar();
    const encontrado = exercicios.find((exercicio) => exercicio.getId() === id);
    return encontrado || null;
  }

  // Busca vrios exerccios de uma vez a partir de uma lista de ids
  // (usado pelo Treino, que guarda só os ids dos exercícios que o compõem)
  public buscarPorIds(ids: string[]): Exercicio[] {
    const exercicios = this.listar();
    return exercicios.filter((exercicio) => ids.includes(exercicio.getId()));
  }

  public criar(exercicio: Exercicio): Exercicio {
    const dados = this.lerArquivo();
    dados.push(exercicio.toJSON());
    this.escreverArquivo(dados);
    return exercicio;
  }

  public atualizar(id: string, exercicioAtualizado: Exercicio): Exercicio | null {
    const dados = this.lerArquivo();
    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    dados[indice] = exercicioAtualizado.toJSON();
    this.escreverArquivo(dados);
    return exercicioAtualizado;
  }

  public remover(id: string): boolean {
    const dados = this.lerArquivo();
    const tamanhoAntes = dados.length;
    const dadosFiltrados = dados.filter((item) => item.id !== id);

    if (dadosFiltrados.length === tamanhoAntes) {
      return false;
    }

    this.escreverArquivo(dadosFiltrados);
    return true;
  }
}
