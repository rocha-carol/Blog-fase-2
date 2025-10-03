import { routes as postsRoutes } from "./postsRoutes.js"
import autores from "./autoresRoutes.js";
import { routes as authRoutes } from "./authRoutes.js";

const routes = (app) => {
  app.use("/posts", postsRoutes);
  app.use("/autores", autores);
  app.use('/auth', authRoutes);
};

export default routes;

