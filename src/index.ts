import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { registerRoutes } from "./routes";
import { userSchemas } from "./modules/user/user.schema";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fcookie from "@fastify/cookie";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "http://0.0.0.0:8000",
});

server.get("/healthcheck", async (req, reply) => {
  reply.send({ message: "still alive", error: false });
});

server.register(fjwt, { secret: "this-is-a-secret" });

server.addHook("preHandler", (req, reply, next) => {
  req.jwt = server.jwt;
  return next();
});

server
  .register(fcookie, {
    secret: "some-secrect-key",
  })
  .decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
          return reply.status(401).send({ message: "Authentication required" });
        }
        const decoded = req.jwt.verify<FastifyJWT["user"]>(accessToken);
        req.user = decoded;
      } catch (error) {
        reply.code(500).send({ message: "Internal Server Error", error });
      }
    }
  );

for (const schema of [...userSchemas]) {
  server.addSchema(schema);
}
registerRoutes(server);

server.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening at port ${address}`);
});

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await server.close();
    process.exit(0);
  });
});
