/*import { routes as postsRoutes } from "./postsRoutes.js"
import autores from "./autoresRoutes.js";
import { routes as authRoutes } from "./authRoutes.js";

const routes = (app) => {
  app.use("/posts", postsRoutes);
  app.use("/autores", autores);
  app.use('/auth', authRoutes);
};

export default routes;*/

import express from "express";
import { routes as postsRoutes } from "./postsRoutes.js";
import { routes as authRoutes } from "./authRoutes.js"; // Certifique que authRoutes.js também use named export "routes"

const routes = express.Router();

routes.use("/auth", authRoutes);   // Rotas de login e registro
routes.use("/posts", postsRoutes);  // Rotas de posts

export { routes };
