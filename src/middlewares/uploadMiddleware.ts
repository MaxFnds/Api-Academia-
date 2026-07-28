// Middleware de upload de imagens usando Multer.
// Configura onde os arquivos são salvos, como são nomeados, e quais tipos/tamanhos são aceitos.
import multer from "multer";
import path from "path";
import { Request } from "express";

// Define onde e como o arquivo será salvo em disco
const armazenamento = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    // Nome único: timestamp + extensão original, evita sobrescrever arquivos com o mesmo nome
    const extensao = path.extname(file.originalname);
    const nomeUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extensao}`;
    callback(null, nomeUnico);
  },
});

// Filtra quais tipos de arquivo são aceitos — só imagens
function filtroDeArquivo(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
  const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

  if (tiposPermitidos.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Formato de imagem não permitido. Use JPEG, PNG ou WEBP."));
  }
}

export const upload = multer({
  storage: armazenamento,
  fileFilter: filtroDeArquivo,
  limits: {
    fileSize: 5 * 1024 * 1024, // limite de 5MB por arquivo
  },
});
