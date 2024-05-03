import { FastifyInstance } from "fastify";
import { userRoutes } from "./modules/user/user.route";

export function registerRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "api/user" });
}
