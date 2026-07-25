"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ponto de entrada da aplicação: importa o app já configurado e sobe o servidor HTTP.
const app_1 = __importDefault(require("./app"));
const PORTA = process.env.PORT || 3000;
app_1.default.listen(PORTA, () => {
    console.log(`  FitWeb rodando em http://localhost:${PORTA}`);
});
//# sourceMappingURL=server.js.map