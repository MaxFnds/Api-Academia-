export declare class Treino {
    private id;
    private nome;
    private alunoId;
    private instrutorId;
    private exercicios;
    private dataCriacao;
    constructor(id: string, nome: string, alunoId: string, instrutorId: string, exercicios: string[], dataCriacao: string);
    getId(): string;
    getNome(): string;
    getAlunoId(): string;
    getInstrutorId(): string;
    getExercicios(): string[];
    getDataCriacao(): string;
    setNome(nome: string): void;
    setAlunoId(alunoId: string): void;
    setInstrutorId(instrutorId: string): void;
    adicionarExercicio(exercicioId: string): void;
    removerExercicio(exercicioId: string): void;
    private validar;
    toJSON(): object;
    static fromJSON(data: any): Treino;
}
//# sourceMappingURL=Exercicio.test.d.ts.map