import { Exercicio } from "../Exercicio";

// Agrupa todos os testes relacionados à entidade Exercicio
describe("Exercicio", () => {

  // Teste 1: garante que um exercício válido é criado corretamente
  it("deve criar um exercício válido", () => {
    const exercicio = new Exercicio("e1", "Agachamento", 4, 12);

    expect(exercicio.getId()).toBe("e1");
    expect(exercicio.getNome()).toBe("Agachamento");
    expect(exercicio.getSeries()).toBe(4);
    expect(exercicio.getRepeticoes()).toBe(12);
    expect(exercicio.getConcluido()).toBe(false); // valor padrão
  });

  // Teste 2: nome vazio deve lançar erro
  it("não deve permitir nome vazio", () => {
    expect(() => {
      new Exercicio("e2", "", 4, 12);
    }).toThrow("O nome do exercício é obrigatório.");
  });

  // Teste 3: séries menor ou igual a zero deve lançar erro
  it("não deve permitir séries menor ou igual a zero", () => {
    expect(() => {
      new Exercicio("e3", "Supino", 0, 10);
    }).toThrow("O número de séries deve ser maior que zero.");
  });

  // Teste 4: repetições menor ou igual a zero deve lançar erro
  it("não deve permitir repetições menor ou igual a zero", () => {
    expect(() => {
      new Exercicio("e4", "Supino", 3, 0);
    }).toThrow("O número de repetições deve ser maior que zero.");
  });

  // Teste 5: setConcluido deve alterar o estado corretamente
  it("deve marcar o exercício como concluído", () => {
    const exercicio = new Exercicio("e5", "Remada", 3, 10);
    exercicio.setConcluido(true);

    expect(exercicio.getConcluido()).toBe(true);
  });

  // Teste 6: setNome com valor inválido deve lançar erro e não alterar o estado
  it("não deve alterar o nome para um valor vazio", () => {
    const exercicio = new Exercicio("e6", "Rosca direta", 3, 10);

    expect(() => {
      exercicio.setNome("");
    }).toThrow("O nome do exercício é obrigatório.");

    // o nome original deve continuar intacto após a tentativa inválida
    expect(exercicio.getNome()).toBe("Rosca direta");
  });

  // Teste 7: toJSON deve gerar o objeto correto
  it("deve converter para JSON corretamente", () => {
    const exercicio = new Exercicio("e7", "Leg press", 4, 15, true);

    expect(exercicio.toJSON()).toEqual({
      id: "e7",
      nome: "Leg press",
      series: 4,
      repeticoes: 15,
      concluido: true,
    });
  });

  // Teste 8: fromJSON deve reconstruir a instância corretamente
  it("deve criar uma instância a partir de um objeto JSON", () => {
    const dados = {
      id: "e8",
      nome: "Puxada frontal",
      series: 3,
      repeticoes: 12,
      concluido: false,
    };

    const exercicio = Exercicio.fromJSON(dados);

    expect(exercicio.getId()).toBe("e8");
    expect(exercicio.getNome()).toBe("Puxada frontal");
    expect(exercicio.getSeries()).toBe(3);
    expect(exercicio.getRepeticoes()).toBe(12);
    expect(exercicio.getConcluido()).toBe(false);
  });

});
