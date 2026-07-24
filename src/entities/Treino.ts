// Entidade Treino: representa um treino montado por um instrutor para um aluno.
// Guarda apenas os IDs de Aluno, Instrutor e Exercicios (não os objetos completos) —
// isso evita duplicar dados e mantém cada entidade independente no JSON.
export class Treino {
  private id: string;
  private nome: string;
  private alunoId: string;
  private instrutorId: string;
  private exercicios: string[]; // lista de ids de Exercicio
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

  public adicionarExercicio(exercicioId: string): void {
    if (this.exercicios.includes(exercicioId)) {
      throw new Error("Este exercício já está no treino.");
    }
    this.exercicios.push(exercicioId);
  }

  public removerExercicio(exercicioId: string): void {
    this.exercicios = this.exercicios.filter((id) => id !== exercicioId);
  }

  private validar(): void {
    if (!this.nome || this.nome.trim().length === 0) {
      throw new Error("O nome do treino é obrigatório.");
    }
    if (!this.alunoId) {
      throw new Error("O treino precisa estar vinculado a um aluno.");
    }
    if (!this.instrutorId) {
      throw new Error("O treino precisa estar vinculado a um instrutor.");
    }
  }

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