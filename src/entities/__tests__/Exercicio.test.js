"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treino = void 0;
class Treino {
    id;
    nome;
    alunoId;
    instrutorId;
    exercicios;
    dataCriacao;
    constructor(id, nome, alunoId, instrutorId, exercicios, dataCriacao) {
        this.id = id;
        this.nome = nome;
        this.alunoId = alunoId;
        this.instrutorId = instrutorId;
        this.exercicios = exercicios;
        this.dataCriacao = dataCriacao;
        this.validar();
    }
    // Getters
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getAlunoId() {
        return this.alunoId;
    }
    getInstrutorId() {
        return this.instrutorId;
    }
    getExercicios() {
        return [...this.exercicios];
    }
    getDataCriacao() {
        return this.dataCriacao;
    }
    // Setters
    setNome(nome) {
        this.nome = nome;
        this.validar();
    }
    setAlunoId(alunoId) {
        this.alunoId = alunoId;
        this.validar();
    }
    setInstrutorId(instrutorId) {
        this.instrutorId = instrutorId;
        this.validar();
    }
    // Adiciona exercício
    adicionarExercicio(exercicioId) {
        if (this.exercicios.includes(exercicioId)) {
            throw new Error("Este exercício já está no treino.");
        }
        this.exercicios.push(exercicioId);
    }
    // Remove exercício
    removerExercicio(exercicioId) {
        this.exercicios = this.exercicios.filter((id) => id !== exercicioId);
    }
    // Validação
    validar() {
        if (!this.nome || this.nome.trim().length === 0) {
            throw new Error("O nome do treino é obrigatório.");
        }
        if (!this.alunoId) {
            throw new Error("O treino precisa estar vinculado a um aluno.");
        }
        if (!this.instrutorId) {
            throw new Error("O treino precisa estar vinculado a um instrutor.");
        }
    }
    // Converter para JSON
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            alunoId: this.alunoId,
            instrutorId: this.instrutorId,
            exercicios: this.exercicios,
            dataCriacao: this.dataCriacao,
        };
    }
    // Converter de JSON para objeto
    static fromJSON(data) {
        return new Treino(data.id, data.nome, data.alunoId, data.instrutorId, data.exercicios || [], data.dataCriacao);
    }
}
exports.Treino = Treino;
//# sourceMappingURL=Exercicio.test.js.map