"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercicioRepository = void 0;
// Repository do Exercicio: única camada responsável por ler e escrever no arquivo dados/exercicios.json.
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Exercicio_1 = require("../entities/Exercicio");
const CAMINHO_ARQUIVO = path_1.default.join(__dirname, "..", "..", "dados", "exercicios.json");
class ExercicioRepository {
    lerArquivo() {
        const conteudo = fs_1.default.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        return JSON.parse(conteudo);
    }
    escreverArquivo(dados) {
        fs_1.default.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), "utf-8");
    }
    listar() {
        const dados = this.lerArquivo();
        return dados.map((item) => Exercicio_1.Exercicio.fromJSON(item));
    }
    buscarPorId(id) {
        const exercicios = this.listar();
        const encontrado = exercicios.find((exercicio) => exercicio.getId() === id);
        return encontrado || null;
    }
    // Busca vrios exerccios de uma vez a partir de uma lista de ids
    // (usado pelo Treino, que guarda só os ids dos exercícios que o compõem)
    buscarPorIds(ids) {
        const exercicios = this.listar();
        return exercicios.filter((exercicio) => ids.includes(exercicio.getId()));
    }
    criar(exercicio) {
        const dados = this.lerArquivo();
        dados.push(exercicio.toJSON());
        this.escreverArquivo(dados);
        return exercicio;
    }
    atualizar(id, exercicioAtualizado) {
        const dados = this.lerArquivo();
        const indice = dados.findIndex((item) => item.id === id);
        if (indice === -1) {
            return null;
        }
        dados[indice] = exercicioAtualizado.toJSON();
        this.escreverArquivo(dados);
        return exercicioAtualizado;
    }
    remover(id) {
        const dados = this.lerArquivo();
        const tamanhoAntes = dados.length;
        const dadosFiltrados = dados.filter((item) => item.id !== id);
        if (dadosFiltrados.length === tamanhoAntes) {
            return false;
        }
        this.escreverArquivo(dadosFiltrados);
        return true;
    }
}
exports.ExercicioRepository = ExercicioRepository;
//# sourceMappingURL=ExercicioRepository.js.map