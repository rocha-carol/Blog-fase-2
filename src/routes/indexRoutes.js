import postsRoutes from "./postsRoutes.js";
import validacaoRoutes from "./validacaoRoutes.js";

const indexRoutes = (app) => {
  app.use("/posts", postsRoutes);
  app.use('/validacao', validacaoRoutes);
};

export default indexRoutes;

