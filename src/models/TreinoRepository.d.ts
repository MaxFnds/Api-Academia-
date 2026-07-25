import { Treino } from "../entities/Treino";
export declare class TreinoRepository {
    private lerArquivo;
    private escreverArquivo;
    listar(): Treino[];
    buscarPorId(id: string): Treino | null;
    buscarPorAlunoId(alunoId: string): Treino[];
    buscarPorInstrutorId(instrutorId: string): Treino[];
    criar(treino: Treino): Treino;
    atualizar(id: string, treinoAtualizado: Treino): Treino | null;
    remover(id: string): boolean;
}
//# sourceMappingURL=TreinoRepository.d.ts.map