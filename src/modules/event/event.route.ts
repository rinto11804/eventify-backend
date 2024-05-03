import { FastifyInstance } from "fastify";
import { $eventRef } from "./event.schema";
import { createEventHandler } from "./event.controller";

export async function eventRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: {
        body: $eventRef("createEventSchema"),
        response: {
          201: $eventRef("createEventResponseSchema"),
        },
      },
      preHandler: [app.authenticate],
    },
    createEventHandler
  );
}
