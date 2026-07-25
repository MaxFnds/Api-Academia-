"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const AlunoRepository_1 = require("../AlunoRepository");
const Aluno_1 = require("../../entities/Aluno");
jest.mock("fs");
const fsMock = fs_1.default;
describe("AlunoRepository - consultas", () => {
    const repository = new AlunoRepository_1.AlunoRepository();
    const alunosFake = [
        { id: "a1", nome: "Maria Silva", email: "maria@email.com", senha: "hash1", idade: 24, fotoPerfil: undefined, dataCadastro: "2026-07-20T14:00:00.000Z" },
        { id: "a2", nome: "João Costa", email: "joao@email.com", senha: "hash2", idade: 30, fotoPerfil: undefined, dataCadastro: "2026-07-20T14:05:00.000Z" },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
        fsMock.readFileSync.mockReturnValue(JSON.stringify(alunosFake));
        fsMock.writeFileSync.mockImplementation(() => { });
    });
    it("deve listar todos os alunos como instâncias de Aluno", () => {
        const alunos = repository.listar();
        expect(alunos).toHaveLength(2);
        const primeiro = alunos[0];
        expect(primeiro).toBeInstanceOf(Aluno_1.Aluno);
        expect(primeiro?.getNome()).toBe("Maria Silva");
    });
    it("deve buscar um aluno pelo id", () => {
        const aluno = repository.buscarPorId("a2");
        expect(aluno).not.toBeNull();
        expect(aluno?.getNome()).toBe("João Costa");
    });
    it("deve retornar null ao buscar um id inexistente", () => {
        const aluno = repository.buscarPorId("a999");
        expect(aluno).toBeNull();
    });
    it("deve buscar um aluno pelo email", () => {
        const aluno = repository.buscarPorEmail("joao@email.com");
        expect(aluno?.getId()).toBe("a2");
    });
});
//# sourceMappingURL=AlunoRepository.test.js.map