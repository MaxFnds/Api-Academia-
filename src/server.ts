// Ponto de entrada da aplicação: importa o app já configurado e sobe o servidor HTTP.
import app from "./app";
import "dotenv/config";

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log(`  FitWeb rodando em http://localhost:${PORTA}`);
});
