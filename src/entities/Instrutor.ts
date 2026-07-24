// Entidade Instrutor: representa o profissional que cria treinos e acompanha alunos.
export class Instrutor {
  private id: string;
  private nome: string;
  private email: string;
  private senha: string; // hash gerado pelo bcrypt
  private especialidade?: string;

  constructor(
    id: string,
    nome: string,
    email: string,
    senha: string,
    especialidade?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.especialidade = especialidade;

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

  public getEspecialidade(): string | undefined {
    return this.especialidade;
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

  public setEspecialidade(especialidade: string): void {
    this.especialidade = especialidade;
  }

  // Validação das regras de negócio
  private validar(): void {
    if (!this.nome || this.nome.trim().length === 0) {
      throw new Error("O nome do instrutor é obrigatório.");
    }
    if (!this.email || !this.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    if (!this.senha || this.senha.length === 0) {
      throw new Error("A senha é obrigatória.");
    }
  }

  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      especialidade: this.especialidade,
    };
  }

  public static fromJSON(data: any): Instrutor {
    return new Instrutor(
      data.id,
      data.nome,
      data.email,
      data.senha,
      data.especialidade
    );
  }
}
