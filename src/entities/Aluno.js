"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
// Entidade Aluno: representa um usuário que treina na academia.
// A senha aqui já deve chegar como HASH (o bcrypt.hash acontece na camada de rotas/service, não aqui).
class Aluno {
    id;
    nome;
    email;
    senha; // hash gerado pelo bcrypt
    idade;
    fotoPerfil;
    dataCadastro;
    constructor(id, nome, email, senha, dataCadastro, idade, fotoPerfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
        this.idade = idade;
        this.fotoPerfil = fotoPerfil;
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
    getIdade() {
        return this.idade;
    }
    getFotoPerfil() {
        return this.fotoPerfil;
    }
    getDataCadastro() {
        return this.dataCadastro;
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
    setIdade(idade) {
        this.idade = idade;
    }
    setFotoPerfil(caminho) {
        this.fotoPerfil = caminho;
    }
    // Validação das regras de negócio
    validar() {
        if (!this.nome || this.nome.trim().length === 0) {
            throw new Error("O nome do aluno é obrigatório.");
        }
        if (!this.email || !this.email.includes("@")) {
            throw new Error("Email inválido.");
        }
        if (!this.senha || this.senha.length === 0) {
            throw new Error("A senha é obrigatória.");
        }
    }
    // Converte para objeto simples pronto pra salvar no JSON
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            idade: this.idade,
            fotoPerfil: this.fotoPerfil,
            dataCadastro: this.dataCadastro,
        };
    }
    // Reconstrói a instância a partir de um objeto vindo do JSON
    static fromJSON(data) {
        return new Aluno(data.id, data.nome, data.email, data.senha, data.dataCadastro, data.idade, data.fotoPerfil);
    }
}
exports.Aluno = Aluno;
//# sourceMappingURL=Aluno.js.map