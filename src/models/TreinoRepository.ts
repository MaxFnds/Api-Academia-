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