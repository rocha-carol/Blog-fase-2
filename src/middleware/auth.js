import jwt from "jsonwebtoken";

// Middleware para verificar se o usuário enviou um token válido
function autenticar(req, res, next) {
  const token = req.headers["authorization"]; // Pega o token do header

  if (!token) {
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
function autorizarProfessor(req, res, next) {
  if (req.usuario.role !== "professor") {
    return res.status(403).json({ message: "Acesso restrito a professores" });
  }
  next();
}

export { autenticar, autorizarProfessor };
