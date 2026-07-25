export declare class Aluno {
    private id;
    private nome;
    private email;
    private senha;
    private idade?;
    private fotoPerfil?;
    private dataCadastro;
    constructor(id: string, nome: string, email: string, senha: string, dataCadastro: string, idade?: number, fotoPerfil?: string);
    getId(): string;
    getNome(): string;
    getEmail(): string;
    getSenha(): string;
    getIdade(): number | undefined;
    getFotoPerfil(): string | undefined;
    getDataCadastro(): string;
    setNome(nome: string): void;
    setEmail(email: string): void;
    setSenha(senha: string): void;
    setIdade(idade: number): void;
    setFotoPerfil(caminho: string): void;
    private validar;
    toJSON(): object;
    static fromJSON(data: any): Aluno;
}
//# sourceMappingURL=Aluno.d.ts.map