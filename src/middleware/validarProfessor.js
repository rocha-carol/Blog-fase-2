/*import jwt from "jsonwebtoken";*/

import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcryptjs";

// Middleware para verificar se o usuário enviou um token válido


// Middleware para validar professor
async function validarProfessor(req, res, next) {
  try {
    const { email, senha } = req.body;

    // Verifica se email e senha foram enviados
    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    };

    // Procura o usuário pelo email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    };

    // Compara a senha informada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: "Senha inválida" });
    };

    // Verifica se é professor
    if (usuario.role !== "professor") {
      return res.status(403).json({ message: "Acesso restrito a professores" });
    };

    // Se tudo certo, adiciona o usuário na requisição
    req.usuario = usuario;
    next(); // continua para o controller

  } catch (err) {
    return res.status(500).json({ message: err.message });
  };
};
export { validarProfessor };



/*static async validar(req, res, next) {
  const token = req.headers["authorization"]; // Pega o token do header

  /*if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    req.usuario = decoded; // Ex: { id, role }
    next(); // Permite passar para a próxima função/rota
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

// Middleware que permite apenas professores acessarem certas rotas
static async autorizarProfessor(req, res, next) {
  if (req.usuario.role !== "professor") {
    return res.status(403).json({ message: "Acesso restrito a professores" });
  }
  next();
}*/





//criar classe e ajustar import/export