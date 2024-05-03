import { FastifyInstance } from "fastify";
import { userRoutes } from "./modules/user/user.route";
import { eventRoutes } from "./modules/event/event.route";

export function registerRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "api/user" });
  app.register(eventRoutes, { prefix: "api/event" });
}
