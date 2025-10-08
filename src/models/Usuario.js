import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define o esquema do usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, default: "professor" }
});

// Cria o modelo "Usuario" baseado no schema
const Usuario = mongoose.model("professor", usuarioSchema);

// Exporta o modelo e o schema
export { Usuario, usuarioSchema };
