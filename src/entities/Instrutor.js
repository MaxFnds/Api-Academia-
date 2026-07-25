"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instrutor = void 0;
// Entidade Instrutor: representa o profissional que cria treinos e acompanha alunos.
class Instrutor {
    id;
    nome;
    email;
    senha; // hash gerado pelo bcrypt
    especialidade;
    constructor(id, nome, email, senha, especialidade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.especialidade = especialidade;
        this.validar();
    }
    // Getters
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getEmail() {
        return this.email;
    }
    getSenha() {
        return this.senha;
    }
    getEspecialidade() {
        return this.especialidade;
    }
    // Setters
    setNome(nome) {
        this.nome = nome;
        this.validar();
    }
    setEmail(email) {
        this.email = email;
        this.validar();
    }
    setSenha(senha) {
        this.senha = senha;
        this.validar();
    }
    setEspecialidade(especialidade) {
        this.especialidade = especialidade;
    }
    // Validação das regras de negócio
    validar() {
        if (!this.nome || this.nome.trim().length === 0) {
            throw new Error("O nome do instrutor é obrigatório.");
        }
        if (!this.email || !this.email.includes("@")) {
            throw new Error("Email inválido.");
        }
        if (!this.senha || this.senha.length === 0) {
            throw new Error("A senha é obrigatória.");
        }
    }
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            especialidade: this.especialidade,
        };
    }
    static fromJSON(data) {
        return new Instrutor(data.id, data.nome, data.email, data.senha, data.especialidade);
    }
}
exports.Instrutor = Instrutor;
//# sourceMappingURL=Instrutor.js.map