import postsRoutes from "./postsRoutes.js";
import autoresRoutes from "./autoresRoutes.js";
import autenticacaoRoutes from "./autenticacaoRoutes.js";

const indexRoutes = (app) => {
  app.use("/posts", postsRoutes);
  app.use("/autores", autoresRoutes);
  app.use('/autenticacao', autenticacaoRoutes);
};

export default indexRoutes;

