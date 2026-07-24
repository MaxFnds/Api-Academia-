import fs from "fs";
import { ExercicioRepository } from "../ExercicioRepository";
import { Exercicio } from "../../entities/Exercicio";

jest.mock("fs");
const fsMock = fs as jest.Mocked<typeof fs>;

describe("ExercicioRepository", () => {
  const repository = new ExercicioRepository();

  const exerciciosFake = [
    { id: "e1", nome: "Supino reto", series: 4, repeticoes: 12, concluido: false },
    { id: "e2", nome: "Agachamento livre", series: 3, repeticoes: 10, concluido: false },
    { id: "e3", nome: "Rosca direta", series: 3, repeticoes: 12, concluido: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    fsMock.readFileSync.mockReturnValue(JSON.stringify(exerciciosFake) as any);
    fsMock.writeFileSync.mockImplementation(() => {});
  });

  it("deve listar todos os exercícios como instâncias de Exercicio", () => {
    const exercicios = repository.listar();

    expect(exercicios).toHaveLength(3);
    expect(exercicios[0]).toBeInstanceOf(Exercicio);
  });

  it("deve buscar um exercício pelo id", () => {
    expect(repository.buscarPorId("e2")?.getNome()).toBe("Agachamento livre");
  });

  // Teste específico do ExercicioRepository: busca em lote pra montar um Treino
  it("deve buscar vários exercícios a partir de uma lista de ids", () => {
    const exercicios = repository.buscarPorIds(["e1", "e3"]);

    expect(exercicios).toHaveLength(2);
    expect(exercicios.map((e) => e.getId())).toEqual(["e1", "e3"]);
  });

  it("deve criar um novo exercício", () => {
    const novo = new Exercicio("e4", "Puxada frontal", 4, 10);

    repository.criar(novo);

    const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0]![1] as string);
    expect(conteudoEscrito).toHaveLength(4);
  });

  it("deve atualizar um exercício, marcando como concluído", () => {
    const atualizado = new Exercicio("e1", "Supino reto", 4, 12, true);

    repository.atualizar("e1", atualizado);

    const conteudoEscrito = JSON.parse(fsMock.writeFileSync.mock.calls[0]![1] as string);
    expect(conteudoEscrito[0].concluido).toBe(true);
  });

  it("deve remover um exercício existente", () => {
    expect(repository.remover("e2")).toBe(true);
  });

  it("deve retornar false ao remover um id inexistente", () => {
    expect(repository.remover("e999")).toBe(false);
  });
});