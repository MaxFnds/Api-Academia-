"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreinoRepository = void 0;
// Repository do Treino: única camada responsável por ler e escrever no arquivo dados/treinos.json.
// Nenhuma outra parte do sistema deve acessar o arquivo JSON diretamente.
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Treino_1 = require("../entities/Treino");
const CAMINHO_ARQUIVO = path_1.default.join(__dirname, "..", "..", "dados", "treinos.json");
class TreinoRepository {
    lerArquivo() {
        const conteudo = fs_1.default.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        return JSON.parse(conteudo);
    }
    escreverArquivo(dados) {
        fs_1.default.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), "utf-8");
    }
    // Retorna todos os treinos já convertidos em instâncias da classe Treino
    listar() {
        const dados = this.lerArquivo();
        return dados.map((item) => Treino_1.Treino.fromJSON(item));
    }
    // Retorna um treino pelo id, ou null se não existir
    buscarPorId(id) {
        const dados = this.lerArquivo();
        const item = dados.find((item) => item.id === id);
        return item ? Treino_1.Treino.fromJSON(item) : null;
    }
    // Retorna todos os treinos vinculados a um aluno específico
    // (vai ser usado na tela "meus treinos" do aluno logado)
    buscarPorAlunoId(alunoId) {
        const treinos = this.listar();
        return treinos.filter((treino) => treino.getAlunoId() === alunoId);
    }
    // Retorna todos os treinos criados por um instrutor específico
    // (vai ser usado na tela "treinos que eu criei" do instrutor logado)
    buscarPorInstrutorId(instrutorId) {
        const treinos = this.listar();
        return treinos.filter((treino) => treino.getInstrutorId() === instrutorId);
    }
    // Adiciona um novo treino ao arquivo
    criar(treino) {
        const dados = this.lerArquivo();
        dados.push(treino.toJSON());
        this.escreverArquivo(dados);
        return treino;
    }
    // Substitui os dados de um treino existente. Retorna null se o id não existir.
    atualizar(id, treinoAtualizado) {
        const dados = this.lerArquivo();
        const indice = dados.findIndex((item) => item.id === id);
        if (indice === -1) {
            return null;
        }
        dados[indice] = treinoAtualizado.toJSON();
        this.escreverArquivo(dados);
        return treinoAtualizado;
    }
    // Remove um treino pelo id. Retorna true se removeu, false se não encontrou.
    remover(id) {
        const dados = this.lerArquivo();
        const tamanhoAntes = dados.length;
        const dadosFiltrados = dados.filter((item) => item.id !== id);
        if (dadosFiltrados.length === tamanhoAntes) {
            return false; // nada foi removido, id não existia
        }
        this.escreverArquivo(dadosFiltrados);
        return true;
    }
}
exports.TreinoRepository = TreinoRepository;
//# sourceMappingURL=TreinoRepository.js.map