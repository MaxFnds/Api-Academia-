import fs from "fs";
import path from "path";
import { Aluno } from "../entities/Aluno";

const CAMINHO_ARQUIVO = path.join(
  __dirname,
  "..",
  "..",
  "dados",
  "alunos.json"
);

export class AlunoRepository {

  // Lê os dados do arquivo JSON
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


  // Salva os dados no arquivo JSON
  private escreverArquivo(dados: any[]): void {

    fs.writeFileSync(
      CAMINHO_ARQUIVO,
      JSON.stringify(dados, null, 2),
      "utf-8"
    );

  }


  // Lista todos os alunos
  public listar(): Aluno[] {

    const dados = this.lerArquivo();

    return dados.map((item) =>
      Aluno.fromJSON(item)
    );

  }


  // Busca aluno pelo ID
  public buscarPorId(id: string): Aluno | null {

    const alunos = this.listar();

    const alunoEncontrado = alunos.find(
      (aluno) => aluno.getId() === id
    );


    return alunoEncontrado || null;

  }


  // Busca aluno pelo email (usado no login)
  public buscarPorEmail(email: string): Aluno | null {

    const alunos = this.listar();

    const alunoEncontrado = alunos.find(
      (aluno) => aluno.getEmail() === email
    );


    return alunoEncontrado || null;

  }


  // Cria um novo aluno
  public criar(aluno: Aluno): Aluno {

    const dados = this.lerArquivo();


    dados.push(
      aluno.toJSON()
    );


    this.escreverArquivo(dados);


    return aluno;

  }


  // Atualiza um aluno existente
  public atualizar(
    id: string,
    alunoAtualizado: Aluno
  ): Aluno | null {


    const dados = this.lerArquivo();


    const indice = dados.findIndex(
      (item) => item.id === id
    );


    if(indice === -1){

      return null;

    }


    dados[indice] = alunoAtualizado.toJSON();


    this.escreverArquivo(dados);


    return alunoAtualizado;

  }


  // Remove um aluno pelo ID
  public remover(id: string): boolean {


    const dados = this.lerArquivo();


    const dadosAntes = dados.length;


    const novosDados = dados.filter(
      (item) => item.id !== id
    );


    if(novosDados.length === dadosAntes){

      return false;

    }


    this.escreverArquivo(novosDados);


    return true;

  }

}