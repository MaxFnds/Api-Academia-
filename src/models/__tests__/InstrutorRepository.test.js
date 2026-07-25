"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const InstrutorRepository_1 = require("../InstrutorRepository");
const Instrutor_1 = require("../../entities/Instrutor");
jest.mock("fs");
const fsMock = fs_1.default;
describe("InstrutorRepository", () => {
    const repository = new InstrutorRepository_1.InstrutorRepository();
    const instrutoresFake = [
        { id: "i1", nome: "Carlos Souza", email: "carlos@email.com", senha: "hash1", especialidade: "Musculação" },
        { id: "i2", nome: "Ana Pereira", email: "ana@email.com", senha: "hash2", especialidade: "Funcional" },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
        fsMock.readFileSync.mockReturnValue(JSON.stringify(instrutoresFake));
        fsMock.writeFileSync.mockImplementation(() => { });
    });
    it("deve listar todos os instrutores como instâncias de Instrutor", () => {
        const instrutores = repository.listar();
        expect(instrutores).toHaveLength(2);
        expect(instrutores[0]).toBeInstanceOf(Instrutor_1.Instrutor);
    });
    it("deve buscar um instrutor pelo id", () => {
        const instrutor = repository.buscarPorId("i2");
        expect(instrutor?.getNome()).toBe("Ana Pereira");
    });
    it("deve retornar null ao buscar um id inexistente", () => {
        expect(repository.buscarPorId("i999")).toBeNull();
    });
    it("deve buscar um instrutor pelo email", () => {
        const instrutor = repository.buscarPorEmail("carlos@email.com");
        expect(instrutor?.getId()).toBe("i1");
    });
    it("deve criar um novo instrutor", () => {
        const novo = new Instrutor_1.Instrutor("i3", "Bia Rocha", "bia@email.com", "hash3", "Crossfit");
        repository.criar(novo);
        const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0][1]);
        expect(conteudoEscrito).toHaveLength(3);
    });
    it("deve atualizar um instrutor existente", () => {
        const atualizado = new Instrutor_1.Instrutor("i1", "Carlos Souza Jr.", "carlos@email.com", "hash1", "Musculação");
        const resultado = repository.atualizar("i1", atualizado);
        expect(resultado).not.toBeNull();
        const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0][1]);
        expect(conteudoEscrito[0].nome).toBe("Carlos Souza Jr.");
    });
    it("deve remover um instrutor existente", () => {
        const resultado = repository.remover("i2");
        expect(resultado).toBe(true);
        const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0][1]);
        expect(conteudoEscrito).toHaveLength(1);
    });
    it("deve retornar false ao remover um id inexistente", () => {
        expect(repository.remover("i999")).toBe(false);
    });
});
//# sourceMappingURL=InstrutorRepository.test.js.map