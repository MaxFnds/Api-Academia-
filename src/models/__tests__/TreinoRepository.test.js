"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const TreinoRepository_1 = require("../TreinoRepository");
const Treino_1 = require("../../entities/Treino");
jest.mock("fs");
const fsMock = fs_1.default;
describe("TreinoRepository", () => {
    const repository = new TreinoRepository_1.TreinoRepository();
    const treinosFake = [
        { id: "t1", nome: "Treino Superior", alunoId: "a1", instrutorId: "i1", exercicios: ["e1", "e3"], dataCriacao: "2026-07-24T11:00:00.000Z" },
        { id: "t2", nome: "Treino de Pernas", alunoId: "a2", instrutorId: "i2", exercicios: ["e2"], dataCriacao: "2026-07-24T11:30:00.000Z" },
        { id: "t3", nome: "Treino Full Body", alunoId: "a1", instrutorId: "i2", exercicios: ["e1", "e2", "e3"], dataCriacao: "2026-07-24T12:00:00.000Z" },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
        fsMock.readFileSync.mockReturnValue(JSON.stringify(treinosFake));
        fsMock.writeFileSync.mockImplementation(() => { });
    });
    it("deve listar todos os treinos como instâncias de Treino", () => {
        const treinos = repository.listar();
        expect(treinos).toHaveLength(3);
        expect(treinos[0]).toBeInstanceOf(Treino_1.Treino);
    });
    it("deve buscar um treino pelo id", () => {
        expect(repository.buscarPorId("t2")?.getNome()).toBe("Treino de Pernas");
    });
    // Teste específico do TreinoRepository: aluno a1 tem 2 treinos (t1 e t3)
    it("deve buscar todos os treinos de um aluno específico", () => {
        const treinos = repository.buscarPorAlunoId("a1");
        expect(treinos).toHaveLength(2);
        expect(treinos.map((t) => t.getId())).toEqual(["t1", "t3"]);
    });
    // Teste específico do TreinoRepository: instrutor i2 tem 2 treinos (t2 e t3)
    it("deve buscar todos os treinos de um instrutor específico", () => {
        const treinos = repository.buscarPorInstrutorId("i2");
        expect(treinos).toHaveLength(2);
        expect(treinos.map((t) => t.getId())).toEqual(["t2", "t3"]);
    });
    it("deve retornar array vazio se o aluno não tiver treinos", () => {
        expect(repository.buscarPorAlunoId("a999")).toEqual([]);
    });
    it("deve criar um novo treino", () => {
        const novo = new Treino_1.Treino("t4", "Treino de Costas", "a2", "i1", ["e3"], "2026-07-24T13:00:00.000Z");
        repository.criar(novo);
        const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0][1]);
        expect(conteudoEscrito).toHaveLength(4);
    });
    it("deve atualizar um treino existente", () => {
        const atualizado = new Treino_1.Treino("t1", "Treino Superior Avançado", "a1", "i1", ["e1", "e3", "e4"], "2026-07-24T11:00:00.000Z");
        const resultado = repository.atualizar("t1", atualizado);
        expect(resultado).not.toBeNull();
        const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0][1]);
        expect(conteudoEscrito[0].nome).toBe("Treino Superior Avançado");
        expect(conteudoEscrito[0].exercicios).toEqual(["e1", "e3", "e4"]);
    });
    it("deve remover um treino existente", () => {
        expect(repository.remover("t3")).toBe(true);
    });
    it("deve retornar false ao remover um id inexistente", () => {
        expect(repository.remover("t999")).toBe(false);
    });
});
//# sourceMappingURL=TreinoRepository.test.js.map