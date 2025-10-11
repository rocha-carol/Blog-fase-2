import postsRoutes from "./postsRoutes.js";
import autenticacaoRoutes from "./autenticacaoRoutes.js";

const indexRoutes = (app) => {
  app.use("/posts", postsRoutes);
  app.use('/autenticacao', autenticacaoRoutes);
};

export default indexRoutes;

