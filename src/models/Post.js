import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  areaDoConhecimento: {
    type: String, required: true, enum: {
      values: ["Linguagens", "Matemática", "Ciências da Natureza", "Ciências Humanas", "Tecnologias"],
    }
  },
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

export { Posts };