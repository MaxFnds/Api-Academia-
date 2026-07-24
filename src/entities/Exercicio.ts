export class Exercicio {
  private id: string;
  private nome: string;
  private series: number;
  private repeticoes: number;
  private concluido: boolean;

  constructor(
    id: string,
    nome: string,
    series: number,
    repeticoes: number,
    concluido: boolean = false
  ) {
    this.id = id;
    this.nome = nome;
    this.series = series;
    this.repeticoes = repeticoes;
    this.concluido = concluido;

    this.validar();
  }

  // Getters: permitem ler os dados de fora da classe sem expor os atributos diretamente
  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getSeries(): number {
    return this.series;
  }

  public getRepeticoes(): number {
    return this.repeticoes;
  }

  public getConcluido(): boolean {
    return this.concluido;
  }

  // Setters: permitem alterar os dados, sempre validando antes de aplicar
  public setNome(nome: string): void {
    this.nome = nome;
    this.validar();
  }

  public setSeries(series: number): void {
    this.series = series;
    this.validar();
  }

  public setRepeticoes(repeticoes: number): void {
    this.repeticoes = repeticoes;
    this.validar();
  }

  public setConcluido(concluido: boolean): void {
    this.concluido = concluido;
  }

  // Validação: garante que a entidade nunca fique em um estado inválido.
  // Lança um erro se alguma regra for quebrada — quem chamar precisa tratar isso.
  private validar(): void {
    if (!this.nome || this.nome.trim().length === 0) {
      throw new Error("O nome do exercício é obrigatório.");
    }
    if (this.series <= 0) {
      throw new Error("O número de séries deve ser maior que zero.");
    }
    if (this.repeticoes <= 0) {
      throw new Error("O número de repetições deve ser maior que zero.");
    }
  }

  // Converte a instância da classe em um objeto simples,
  // pronto para ser salvo no arquivo JSON.
  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      series: this.series,
      repeticoes: this.repeticoes,
      concluido: this.concluido,
    };
  }

  // Cria uma instância de Exercicio a partir de um objeto vindo do JSON.
  // Usado quando o repository lê os dados do arquivo dados/exercicios.json.
  public static fromJSON(data: any): Exercicio {
    return new Exercicio(
      data.id,
      data.nome,
      data.series,
      data.repeticoes,
      data.concluido
    );
  }
}
