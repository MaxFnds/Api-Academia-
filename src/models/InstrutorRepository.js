"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrutorRepository = void 0;
// Repository do Instrutor: única camada responsável por ler e escrever no arquivo dados/instrutores.json.
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Instrutor_1 = require("../entities/Instrutor");
const CAMINHO_ARQUIVO = path_1.default.join(__dirname, "..", "..", "dados", "instrutores.json");
class InstrutorRepository {
    lerArquivo() {
        const conteudo = fs_1.default.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        return JSON.parse(conteudo);
    }
    escreverArquivo(dados) {
        fs_1.default.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), "utf-8");
    }
    listar() {
        const dados = this.lerArquivo();
        return dados.map((item) => Instrutor_1.Instrutor.fromJSON(item));
    }
    buscarPorId(id) {
        const instrutores = this.listar();
        const encontrado = instrutores.find((instrutor) => instrutor.getId() === id);
        return encontrado || null;
    }
    buscarPorEmail(email) {
        const instrutores = this.listar();
        const encontrado = instrutores.find((instrutor) => instrutor.getEmail() === email);
        return encontrado || null;
    }
    criar(instrutor) {
        const dados = this.lerArquivo();
        dados.push(instrutor.toJSON());
        this.escreverArquivo(dados);
        return instrutor;
    }
    atualizar(id, instrutorAtualizado) {
        const dados = this.lerArquivo();
        const indice = dados.findIndex((item) => item.id === id);
        if (indice === -1) {
            return null;
        }
        dados[indice] = instrutorAtualizado.toJSON();
        this.escreverArquivo(dados);
        return instrutorAtualizado;
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
exports.InstrutorRepository = InstrutorRepository;
//# sourceMappingURL=InstrutorRepository.js.map