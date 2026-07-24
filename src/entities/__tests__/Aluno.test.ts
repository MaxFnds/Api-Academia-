import { Aluno } from "../Aluno";

describe("Aluno", () => {

  // Teste 1: criação válida com todos os campos
  it("deve criar um aluno válido com todos os campos", () => {
    const aluno = new Aluno(
      "a1",
      "Maria Silva",
      "maria@email.com",
      "hashDaSenha123",
      "2026-07-20T14:00:00.000Z",
      24,
      "uploads/a1.jpg"
    );

    expect(aluno.getId()).toBe("a1");
    expect(aluno.getNome()).toBe("Maria Silva");
    expect(aluno.getEmail()).toBe("maria@email.com");
    expect(aluno.getIdade()).toBe(24);
    expect(aluno.getFotoPerfil()).toBe("uploads/a1.jpg");
  });

  // Teste 2: criação válida sem os campos opcionais
  it("deve criar um aluno válido sem idade e sem foto", () => {
    const aluno = new Aluno(
      "a2",
      "João Costa",
      "joao@email.com",
      "hashDaSenha456",
      "2026-07-20T14:05:00.000Z"
    );

    expect(aluno.getIdade()).toBeUndefined();
    expect(aluno.getFotoPerfil()).toBeUndefined();
  });

  // Teste 3: nome vazio deve lançar erro
  it("não deve permitir nome vazio", () => {
    expect(() => {
      new Aluno("a3", "", "teste@email.com", "hash123", "2026-07-20T14:00:00.000Z");
    }).toThrow("O nome do aluno é obrigatório.");
  });

  // Teste 4: email inválido (sem @) deve lançar erro
  it("não deve permitir email sem @", () => {
    expect(() => {
      new Aluno("a4", "Teste", "emailinvalido.com", "hash123", "2026-07-20T14:00:00.000Z");
    }).toThrow("Email inválido.");
  });

  // Teste 5: senha vazia deve lançar erro
  it("não deve permitir senha vazia", () => {
    expect(() => {
      new Aluno("a5", "Teste", "teste@email.com", "", "2026-07-20T14:00:00.000Z");
    }).toThrow("A senha é obrigatória.");
  });

  // Teste 6: toJSON deve gerar o objeto correto
  it("deve converter para JSON corretamente", () => {
    const aluno = new Aluno(
      "a6",
      "Ana Paula",
      "ana@email.com",
      "hash789",
      "2026-07-20T14:10:00.000Z",
      30
    );

    expect(aluno.toJSON()).toEqual({
      id: "a6",
      nome: "Ana Paula",
      email: "ana@email.com",
      senha: "hash789",
      idade: 30,
      fotoPerfil: undefined,
      dataCadastro: "2026-07-20T14:10:00.000Z",
    });
  });

  // Teste 7: fromJSON deve reconstruir a instância corretamente
  it("deve criar uma instância a partir de um objeto JSON", () => {
    const dados = {
      id: "a7",
      nome: "Pedro Lima",
      email: "pedro@email.com",
      senha: "hashXYZ",
      dataCadastro: "2026-07-20T14:15:00.000Z",
      idade: 22,
      fotoPerfil: "uploads/a7.jpg",
    };

    const aluno = Aluno.fromJSON(dados);

    expect(aluno.getNome()).toBe("Pedro Lima");
    expect(aluno.getEmail()).toBe("pedro@email.com");
    expect(aluno.getIdade()).toBe(22);
  });

});
