import mongoose from "mongoose";
import { autorSchema } from "./autor.js";

const PostSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  areaDoConhecimento: {
    type: String, required: true, enum: {
      values: ["Linguagens", "Matemática", "Ciências da Natureza", "Ciências Humanas", "Tecnologias"],
    }
  },

  // ➝ NOVO CAMPO para listagem pública/resumida
  resumo: { type: String },

  // ➝ NOVO CAMPO para definir se o post aparece para alunos
  status: {
    type: String,
    enum: ["publicado", "rascunho"],
    default: "rascunho"
  },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "professor", required: true },
}, {
  versionKey: false,
  timestamps: true
});

PostSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.createdAt) ret.createdAt = `Criado em: ${new Date(ret.createdAt).toLocaleDateString('pt-BR')}`;
    if (ret.updatedAt) ret.updatedAt = `Atualizado em: ${new Date(ret.updatedAt).toLocaleDateString('pt-BR')}`;
  }


});

const Posts = mongoose.model("Posts", PostSchema);


export { Posts, PostSchema };


