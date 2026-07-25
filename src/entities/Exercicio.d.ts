export declare class Exercicio {
    private id;
    private nome;
    private series;
    private repeticoes;
    private concluido;
    constructor(id: string, nome: string, series: number, repeticoes: number, concluido?: boolean);
    getId(): string;
    getNome(): string;
    getSeries(): number;
    getRepeticoes(): number;
    getConcluido(): boolean;
    setNome(nome: string): void;
    setSeries(series: number): void;
    setRepeticoes(repeticoes: number): void;
    setConcluido(concluido: boolean): void;
    private validar;
    toJSON(): object;
    static fromJSON(data: any): Exercicio;
}
//# sourceMappingURL=Exercicio.d.ts.map