import { Aluno } from "../entities/Aluno";
export declare class AlunoRepository {
    private lerArquivo;
    private escreverArquivo;
    listar(): Aluno[];
    buscarPorId(id: string): Aluno | null;
    buscarPorEmail(email: string): Aluno | null;
    criar(aluno: Aluno): Aluno;
    atualizar(id: string, alunoAtualizado: Aluno): Aluno | null;
    remover(id: string): boolean;
}
//# sourceMappingURL=AlunoRepository.d.ts.map