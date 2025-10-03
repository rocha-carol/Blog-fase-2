import mongoose from "mongoose";

// Define o esquema do usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },        // Nome do usuário
  email: { type: String, required: true, unique: true }, // Email único
  senha: { type: String, required: true },      // Senha criptografada
  role: { 
    type: String, 
    enum: ["aluno", "professor"], // Apenas "aluno" ou "professor"
    required: true 
  }
});

// Cria o modelo "Usuarios" baseado no schema
const Usuarios = mongoose.model("Usuarios", usuarioSchema);

// Exporta o modelo e o schema
export { Usuarios, usuarioSchema };
