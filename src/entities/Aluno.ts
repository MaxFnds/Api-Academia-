// Entidade Aluno: representa um usuário que treina na academia.
// A senha aqui já deve chegar como HASH (o bcrypt.hash acontece na camada de rotas/service, não aqui).
export class Aluno {
  private id: string;
  private nome: string;
  private email: string;
  private senha: string; // hash gerado pelo bcrypt
  private idade?: number;
  private fotoPerfil?: string;
  private dataCadastro: string;

  constructor(
    id: string,
    nome: string,
    email: string,
    senha: string,
    dataCadastro: string,
    idade?: number,
    fotoPerfil?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = dataCadastro;
    this.idade = idade;
    this.fotoPerfil = fotoPerfil;

    this.validar();
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSenha(): string {
    return this.senha;
  }

  public getIdade(): number | undefined {
    return this.idade;
  }

  public getFotoPerfil(): string | undefined {
    return this.fotoPerfil;
  }

  public getDataCadastro(): string {
    return this.dataCadastro;
  }

  // Setters
  public setNome(nome: string): void {
    this.nome = nome;
    this.validar();
  }

  public setEmail(email: string): void {
    this.email = email;
    this.validar();
  }

  public setSenha(senha: string): void {
    this.senha = senha;
    this.validar();
  }

  public setIdade(idade: number): void {
    this.idade = idade;
  }

  public setFotoPerfil(caminho: string): void {
    this.fotoPerfil = caminho;
  }

  // Validação das regras de negócio
  private validar(): void {
    if (!this.nome || this.nome.trim().length === 0) {
      throw new Error("O nome do aluno é obrigatório.");
    }
    if (!this.email || !this.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    if (!this.senha || this.senha.length === 0) {
      throw new Error("A senha é obrigatória.");
    }
  }

  // Converte para objeto simples pronto pra salvar no JSON
  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      idade: this.idade,
      fotoPerfil: this.fotoPerfil,
      dataCadastro: this.dataCadastro,
    };
  }

  // Reconstrói a instância a partir de um objeto vindo do JSON
  public static fromJSON(data: any): Aluno {
    return new Aluno(
      data.id,
      data.nome,
      data.email,
      data.senha,
      data.dataCadastro,
      data.idade,
      data.fotoPerfil
    );
  }
}
