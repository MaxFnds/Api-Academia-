// Repository do Instrutor: única camada responsável por ler e escrever no arquivo dados/instrutores.json.
import fs from "fs";
import path from "path";
import { Instrutor } from "../entities/Instrutor";

const CAMINHO_ARQUIVO = path.join(__dirname, "..", "..", "dados", "instrutores.json");

export class InstrutorRepository {

  private lerArquivo(): any[] {
    const conteudo = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
    return JSON.parse(conteudo);
  }

  private escreverArquivo(dados: any[]): void {
    fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), "utf-8");
  }

  public listar(): Instrutor[] {
    const dados = this.lerArquivo();
    return dados.map((item) => Instrutor.fromJSON(item));
  }

  public buscarPorId(id: string): Instrutor | null {
    const instrutores = this.listar();
    const encontrado = instrutores.find((instrutor) => instrutor.getId() === id);
    return encontrado || null;
  }

  public buscarPorEmail(email: string): Instrutor | null {
    const instrutores = this.listar();
    const encontrado = instrutores.find((instrutor) => instrutor.getEmail() === email);
    return encontrado || null;
  }

  public criar(instrutor: Instrutor): Instrutor {
    const dados = this.lerArquivo();
    dados.push(instrutor.toJSON());
    this.escreverArquivo(dados);
    return instrutor;
  }

  public atualizar(id: string, instrutorAtualizado: Instrutor): Instrutor | null {
    const dados = this.lerArquivo();
    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    dados[indice] = instrutorAtualizado.toJSON();
    this.escreverArquivo(dados);
    return instrutorAtualizado;
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
