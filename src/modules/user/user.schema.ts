import { buildJsonSchemas } from "fastify-zod";
import { z } from 'zod'


const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255)
})

const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255)
})

const loginUserResponseSchema = z.object({
  access_token: z.string()
})

export const { schemas: userSchemas, $ref: $userRef } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginUserSchema,
    loginUserResponseSchema,
  },
  {
    $id: "user",
  }
);


export type CreateUserBody = z.infer<typeof createUserSchema>
export type UserLoginBody = z.infer<typeof loginUserSchema>
