"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercicio = void 0;
class Exercicio {
    id;
    nome;
    series;
    repeticoes;
    concluido;
    constructor(id, nome, series, repeticoes, concluido = false) {
        this.id = id;
        this.nome = nome;
        this.series = series;
        this.repeticoes = repeticoes;
        this.concluido = concluido;
        this.validar();
    }
    // Getters: permitem ler os dados de fora da classe sem expor os atributos diretamente
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getSeries() {
        return this.series;
    }
    getRepeticoes() {
        return this.repeticoes;
    }
    getConcluido() {
        return this.concluido;
    }
    // Setters: permitem alterar os dados, sempre validando antes de aplicar
    setNome(nome) {
        this.nome = nome;
        this.validar();
    }
    setSeries(series) {
        this.series = series;
        this.validar();
    }
    setRepeticoes(repeticoes) {
        this.repeticoes = repeticoes;
        this.validar();
    }
    setConcluido(concluido) {
        this.concluido = concluido;
    }
    // Validação: garante que a entidade nunca fique em um estado inválido.
    // Lança um erro se alguma regra for quebrada — quem chamar precisa tratar isso.
    validar() {
        if (!this.nome || this.nome.trim().length === 0) {
            throw new Error("O nome do exercício é obrigatório.");
        }
        if (this.series <= 0) {
            throw new Error("O número de séries deve ser maior que zero.");
        }
        if (this.repeticoes <= 0) {
            throw new Error("O número de repetições deve ser maior que zero.");
        }
    }
    // Converte a instância da classe em um objeto simples,
    // pronto para ser salvo no arquivo JSON.
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            series: this.series,
            repeticoes: this.repeticoes,
            concluido: this.concluido,
        };
    }
    // Cria uma instância de Exercicio a partir de um objeto vindo do JSON.
    // Usado quando o repository lê os dados do arquivo dados/exercicios.json.
    static fromJSON(data) {
        return new Exercicio(data.id, data.nome, data.series, data.repeticoes, data.concluido);
    }
}
exports.Exercicio = Exercicio;
//# sourceMappingURL=Exercicio.js.map