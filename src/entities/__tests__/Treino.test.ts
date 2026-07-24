import { Treino } from "../Treino";

describe("Treino", () => {

  // Teste 1: criação válida com exercícios
  it("deve criar um treino válido", () => {
    const treino = new Treino(
      "t1",
      "Treino de Pernas",
      "a1",
      "i1",
      ["e1", "e2"],
      "2026-07-20T14:00:00.000Z"
    );

    expect(treino.getId()).toBe("t1");
    expect(treino.getNome()).toBe("Treino de Pernas");
    expect(treino.getAlunoId()).toBe("a1");
    expect(treino.getInstrutorId()).toBe("i1");
    expect(treino.getExercicios()).toEqual(["e1", "e2"]);
  });

  // Teste 2: criação válida sem exercícios (lista vazia)
  it("deve criar um treino válido sem exercícios ainda", () => {
    const treino = new Treino("t2", "Treino Vazio", "a1", "i1", [], "2026-07-20T14:00:00.000Z");

    expect(treino.getExercicios()).toEqual([]);
  });

  // Teste 3: nome vazio deve lançar erro
  it("não deve permitir nome vazio", () => {
    expect(() => {
      new Treino("t3", "", "a1", "i1", [], "2026-07-20T14:00:00.000Z");
    }).toThrow("O nome do treino é obrigatório.");
  });

  // Teste 4: sem alunoId deve lançar erro
  it("não deve permitir treino sem aluno vinculado", () => {
    expect(() => {
      new Treino("t4", "Treino Teste", "", "i1", [], "2026-07-20T14:00:00.000Z");
    }).toThrow("O treino precisa estar vinculado a um aluno.");
  });

  // Teste 5: sem instrutorId deve lançar erro
  it("não deve permitir treino sem instrutor vinculado", () => {
    expect(() => {
      new Treino("t5", "Treino Teste", "a1", "", [], "2026-07-20T14:00:00.000Z");
    }).toThrow("O treino precisa estar vinculado a um instrutor.");
  });

  // Teste 6: adicionarExercicio deve incluir um novo id na lista
  it("deve adicionar um exercício ao treino", () => {
    const treino = new Treino("t6", "Treino Teste", "a1", "i1", ["e1"], "2026-07-20T14:00:00.000Z");
    treino.adicionarExercicio("e2");

    expect(treino.getExercicios()).toEqual(["e1", "e2"]);
  });

  // Teste 7: adicionarExercicio não deve permitir duplicados
  it("não deve permitir adicionar o mesmo exercício duas vezes", () => {
    const treino = new Treino("t7", "Treino Teste", "a1", "i1", ["e1"], "2026-07-20T14:00:00.000Z");

    expect(() => {
      treino.adicionarExercicio("e1");
    }).toThrow("Este exercício já está no treino.");
  });

  // Teste 8: removerExercicio deve tirar o id da lista
  it("deve remover um exercício do treino", () => {
    const treino = new Treino("t8", "Treino Teste", "a1", "i1", ["e1", "e2"], "2026-07-20T14:00:00.000Z");
    treino.removerExercicio("e1");

    expect(treino.getExercicios()).toEqual(["e2"]);
  });

  // Teste 9: getExercicios deve retornar uma cópia, não a referência interna
  it("não deve permitir alterar a lista interna via getExercicios", () => {
    const treino = new Treino("t9", "Treino Teste", "a1", "i1", ["e1"], "2026-07-20T14:00:00.000Z");

    const lista = treino.getExercicios();
    lista.push("e2"); // tenta alterar a cópia

    // a lista interna do treino não deve ter sido afetada
    expect(treino.getExercicios()).toEqual(["e1"]);
  });

  // Teste 10: toJSON deve gerar o objeto correto
  it("deve converter para JSON corretamente", () => {
    const treino = new Treino("t10", "Treino Full Body", "a1", "i1", ["e1", "e2"], "2026-07-20T14:30:00.000Z");

    expect(treino.toJSON()).toEqual({
      id: "t10",
      nome: "Treino Full Body",
      alunoId: "a1",
      instrutorId: "i1",
      exercicios: ["e1", "e2"],
      dataCriacao: "2026-07-20T14:30:00.000Z",
    });
  });

  // Teste 11: fromJSON deve reconstruir a instância corretamente
  it("deve criar uma instância a partir de um objeto JSON", () => {
    const dados = {
      id: "t11",
      nome: "Treino Upper Body",
      alunoId: "a2",
      instrutorId: "i2",
      exercicios: ["e3"],
      dataCriacao: "2026-07-20T14:45:00.000Z",
    };

    const treino = Treino.fromJSON(dados);

    expect(treino.getNome()).toBe("Treino Upper Body");
    expect(treino.getExercicios()).toEqual(["e3"]);
  });

  // Teste 12: fromJSON sem campo exercicios deve assumir lista vazia
  it("deve assumir lista de exercícios vazia se o JSON não tiver o campo", () => {
    const dados = {
      id: "t12",
      nome: "Treino Sem Exercicios",
      alunoId: "a1",
      instrutorId: "i1",
      dataCriacao: "2026-07-20T15:00:00.000Z",
    };

    const treino = Treino.fromJSON(dados);

    expect(treino.getExercicios()).toEqual([]);
  });

});
