import { Exercicio } from "../entities/Exercicio";
export declare class ExercicioRepository {
    private lerArquivo;
    private escreverArquivo;
    listar(): Exercicio[];
    buscarPorId(id: string): Exercicio | null;
    buscarPorIds(ids: string[]): Exercicio[];
    criar(exercicio: Exercicio): Exercicio;
    atualizar(id: string, exercicioAtualizado: Exercicio): Exercicio | null;
    remover(id: string): boolean;
}
//# sourceMappingURL=ExercicioRepository.d.ts.map