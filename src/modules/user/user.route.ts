import { FastifyInstance } from "fastify";
import { $userRef } from "./user.schema";
import { createUserHandler, loginUserHandler } from "./user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.get('/', (req, reply) => {
    reply.send({ message: '/ route', error: false })
  })

  app.post('/signup',
    {
      schema: {
        body: $userRef('createUserSchema'),
        response: {
          201: $userRef('createUserResponseSchema')
        },
      }
    }, createUserHandler)

  app.post('/signin', {
    schema: {
      body: $userRef('loginUserSchema'),
      response: {
        200: $userRef('loginUserResponseSchema')
      }
    }
  }, loginUserHandler);

  app.delete('/login', (req, reply) => {

  })

  app.log.info('user routes registed')
}
