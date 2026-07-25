import { Instrutor } from "../entities/Instrutor";
export declare class InstrutorRepository {
    private lerArquivo;
    private escreverArquivo;
    listar(): Instrutor[];
    buscarPorId(id: string): Instrutor | null;
    buscarPorEmail(email: string): Instrutor | null;
    criar(instrutor: Instrutor): Instrutor;
    atualizar(id: string, instrutorAtualizado: Instrutor): Instrutor | null;
    remover(id: string): boolean;
}
//# sourceMappingURL=InstrutorRepository.d.ts.map