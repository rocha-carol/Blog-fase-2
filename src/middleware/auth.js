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


/*import jwt from "jsonwebtoken"; // Biblioteca para gerar e validar tokens JWT
//

// Middleware para verificar se o usuário enviou um token válido
function autenticar(req, res, next) {
  // Captura o token enviado no cabeçalho Authorization
  const token = req.headers["authorization"]; 

  // Se não tiver token, bloqueia o acesso
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    // Verifica se o token é válido e decodifica as informações
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Salva os dados do usuário (id, role) dentro do req para usar depois
    req.usuario = decoded;

    // Libera para o próximo middleware ou rota
    next();
  } catch (err) {
    // Se o token for inválido ou expirado
    return res.status(403).json({ message: "Token inválido" });
  }
}

// Middleware para garantir que apenas professores possam acessar certas rotas
function autorizarProfessor(req, res, next) {
  // Verifica se o role do usuário não é professor
  if (req.usuario.role !== "professor") {
    return res.status(403).json({ message: "Acesso restrito a professores" });
  }

  // Se for professor, segue em frente
  next();
}

export { autenticar, autorizarProfessor };*/


