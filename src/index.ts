import fastify from "fastify";
import { registerRoutes } from "./routes";
import { userSchemas } from "./modules/user/user.schema";
import { fastifyJwt } from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie";
import { prisma } from "./storage/prisma";

const server = fastify();


server.get('/healthcheck', async (req, reply) => {
  reply.send({ message: 'still alive', error: false })
})

server.register(fastifyJwt, { secret: 'this-is-a-secret' })

server.addHook('preHandler', (req, reply, next) => {
  req.jwt = server.jwt
  return next()
})

prisma.event.create({
  data: {
    title: 'Hello',
    description: 'new Task added',
    date: '12-03-2024',
    from: '10:00',
    to: '12:00',
  }
})
server.register(fastifyCookie, {
  secret: 'some-secrect-key',
  hook: 'preHandler'
})

for (const schema of [...userSchemas]) {
  server.addSchema(schema)
}
registerRoutes(server);

server.listen({ port: 8000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server is listening at port ${address}`)
})

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await server.close()
    process.exit(0)
  })
})
