export class Treino {
  private id: string;
  private nome: string;
  private alunoId: string;
  private instrutorId: string;
  private exercicios: string[];
  private dataCriacao: string;

  constructor(
    id: string,
    nome: string,
    alunoId: string,
    instrutorId: string,
    exercicios: string[],
    dataCriacao: string
  ) {
    this.id = id;
    this.nome = nome;
    this.alunoId = alunoId;
    this.instrutorId = instrutorId;
    this.exercicios = exercicios;
    this.dataCriacao = dataCriacao;

    this.validar();
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getAlunoId(): string {
    return this.alunoId;
  }

  public getInstrutorId(): string {
    return this.instrutorId;
  }

  public getExercicios(): string[] {
    return [...this.exercicios];
  }

  public getDataCriacao(): string {
    return this.dataCriacao;
  }

  // Setters
  public setNome(nome: string): void {
    this.nome = nome;
    this.validar();
  }

  public setAlunoId(alunoId: string): void {
    this.alunoId = alunoId;
    this.validar();
  }

  public setInstrutorId(instrutorId: string): void {
    this.instrutorId = instrutorId;
    this.validar();
  }

  // Adiciona exercício
  public adicionarExercicio(exercicioId: string): void {
    if (this.exercicios.includes(exercicioId)) {
      throw new Error("Este exercício já está no treino.");
    }

    this.exercicios.push(exercicioId);
  }

  // Remove exercício
  public removerExercicio(exercicioId: string): void {
    this.exercicios = this.exercicios.filter(
      (id) => id !== exercicioId
    );
  }

  // Validação
  private validar(): void {
    if (!this.nome || this.nome.trim().length === 0) {
      throw new Error("O nome do treino é obrigatório.");
    }

    if (!this.alunoId) {
      throw new Error(
        "O treino precisa estar vinculado a um aluno."
      );
    }

    if (!this.instrutorId) {
      throw new Error(
        "O treino precisa estar vinculado a um instrutor."
      );
    }
  }

  // Converter para JSON
  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      alunoId: this.alunoId,
      instrutorId: this.instrutorId,
      exercicios: this.exercicios,
      dataCriacao: this.dataCriacao,
    };
  }

  // Converter de JSON para objeto
  public static fromJSON(data: any): Treino {
    return new Treino(
      data.id,
      data.nome,
      data.alunoId,
      data.instrutorId,
      data.exercicios || [],
      data.dataCriacao
    );
  }
}