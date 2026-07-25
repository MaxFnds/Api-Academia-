export declare class Instrutor {
    private id;
    private nome;
    private email;
    private senha;
    private especialidade?;
    constructor(id: string, nome: string, email: string, senha: string, especialidade?: string);
    getId(): string;
    getNome(): string;
    getEmail(): string;
    getSenha(): string;
    getEspecialidade(): string | undefined;
    setNome(nome: string): void;
    setEmail(email: string): void;
    setSenha(senha: string): void;
    setEspecialidade(especialidade: string): void;
    private validar;
    toJSON(): object;
    static fromJSON(data: any): Instrutor;
}
//# sourceMappingURL=Instrutor.d.ts.map