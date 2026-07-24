import { Instrutor } from "../Instrutor";

describe("Instrutor", () => {

  // Teste 1: criação válida com especialidade
  it("deve criar um instrutor válido com especialidade", () => {
    const instrutor = new Instrutor(
      "i1",
      "Carlos Souza",
      "carlos@email.com",
      "hashDaSenha123",
      "CrossFit"
    );

    expect(instrutor.getId()).toBe("i1");
    expect(instrutor.getNome()).toBe("Carlos Souza");
    expect(instrutor.getEspecialidade()).toBe("CrossFit");
  });

  // Teste 2: criação válida sem especialidade
  it("deve criar um instrutor válido sem especialidade", () => {
    const instrutor = new Instrutor(
      "i2",
      "Fernanda Reis",
      "fernanda@email.com",
      "hashDaSenha456"
    );

    expect(instrutor.getEspecialidade()).toBeUndefined();
  });

  // Teste 3: nome vazio deve lançar erro
  it("não deve permitir nome vazio", () => {
    expect(() => {
      new Instrutor("i3", "", "teste@email.com", "hash123");
    }).toThrow("O nome do instrutor é obrigatório.");
  });

  // Teste 4: email inválido deve lançar erro
  it("não deve permitir email sem @", () => {
    expect(() => {
      new Instrutor("i4", "Teste", "emailinvalido.com", "hash123");
    }).toThrow("Email inválido.");
  });

  // Teste 5: senha vazia deve lançar erro
  it("não deve permitir senha vazia", () => {
    expect(() => {
      new Instrutor("i5", "Teste", "teste@email.com", "");
    }).toThrow("A senha é obrigatória.");
  });

  // Teste 6: toJSON deve gerar o objeto correto
  it("deve converter para JSON corretamente", () => {
    const instrutor = new Instrutor("i6", "Bruna Alves", "bruna@email.com", "hash789", "Musculação");

    expect(instrutor.toJSON()).toEqual({
      id: "i6",
      nome: "Bruna Alves",
      email: "bruna@email.com",
      senha: "hash789",
      especialidade: "Musculação",
    });
  });

  // Teste 7: fromJSON deve reconstruir a instância corretamente
  it("deve criar uma instância a partir de um objeto JSON", () => {
    const dados = {
      id: "i7",
      nome: "Rafael Nunes",
      email: "rafael@email.com",
      senha: "hashXYZ",
      especialidade: "Funcional",
    };

    const instrutor = Instrutor.fromJSON(dados);

    expect(instrutor.getNome()).toBe("Rafael Nunes");
    expect(instrutor.getEspecialidade()).toBe("Funcional");
  });

});
