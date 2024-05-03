import { FastifyInstance } from "fastify";
import { $userRef } from "./user.schema";
import { createUserHandler, loginUserHandler, logout } from "./user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", (req, reply) => {
    reply.send({ message: "/ route", error: false });
  });

  app.post(
    "/signup",
    {
      schema: {
        body: $userRef("createUserSchema"),
        response: {
          201: $userRef("createUserResponseSchema"),
        },
      },
    },
    createUserHandler
  );

  app.post(
    "/signin",
    {
      schema: {
        body: $userRef("loginUserSchema"),
        response: {
          200: $userRef("loginUserResponseSchema"),
        },
      },
    },
    loginUserHandler
  );

  app.post("/logout", { preHandler: [app.authenticate] }, logout);
}
