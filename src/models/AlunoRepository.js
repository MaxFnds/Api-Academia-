"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Aluno_1 = require("../entities/Aluno");
const CAMINHO_ARQUIVO = path_1.default.join(__dirname, "..", "..", "dados", "alunos.json");
class AlunoRepository {
    // Lê os dados do arquivo JSON
    lerArquivo() {
        const conteudo = fs_1.default.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        return JSON.parse(conteudo);
    }
    // Salva os dados no arquivo JSON
    escreverArquivo(dados) {
        fs_1.default.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), "utf-8");
    }
    // Lista todos os alunos
    listar() {
        const dados = this.lerArquivo();
        return dados.map((item) => Aluno_1.Aluno.fromJSON(item));
    }
    // Busca aluno pelo ID
    buscarPorId(id) {
        const alunos = this.listar();
        const alunoEncontrado = alunos.find((aluno) => aluno.getId() === id);
        return alunoEncontrado || null;
    }
    // Busca aluno pelo email (usado no login)
    buscarPorEmail(email) {
        const alunos = this.listar();
        const alunoEncontrado = alunos.find((aluno) => aluno.getEmail() === email);
        return alunoEncontrado || null;
    }
    // Cria um novo aluno
    criar(aluno) {
        const dados = this.lerArquivo();
        dados.push(aluno.toJSON());
        this.escreverArquivo(dados);
        return aluno;
    }
    // Atualiza um aluno existente
    atualizar(id, alunoAtualizado) {
        const dados = this.lerArquivo();
        const indice = dados.findIndex((item) => item.id === id);
        if (indice === -1) {
            return null;
        }
        dados[indice] = alunoAtualizado.toJSON();
        this.escreverArquivo(dados);
        return alunoAtualizado;
    }
    // Remove um aluno pelo ID
    remover(id) {
        const dados = this.lerArquivo();
        const dadosAntes = dados.length;
        const novosDados = dados.filter((item) => item.id !== id);
        if (novosDados.length === dadosAntes) {
            return false;
        }
        this.escreverArquivo(novosDados);
        return true;
    }
}
exports.AlunoRepository = AlunoRepository;
//# sourceMappingURL=AlunoRepository.js.map