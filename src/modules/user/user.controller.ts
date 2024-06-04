import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, UserLoginBody } from "./user.schema";
import { createUser, getUserByEmail } from "./user.service";
import bcrypt from "bcrypt";

export async function createUserHandler(
  req: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply
) {
  const { email, name, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    return reply
      .status(401)
      .send({ message: "user with this email already exists", error: true });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({
      email,
      name,
      password: hash,
    });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return reply.status(201).send(payload);
  } catch (e) {
    return reply
      .status(500)
      .send({ message: "user creation failed", error: true });
  }
}

export async function loginUserHandler(
  req: FastifyRequest<{ Body: UserLoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return reply.status(401).send({ message: "user not found", error: true });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return reply.status(401).send({ message: "invalid password", error: true });
  }
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = req.jwt.sign(payload);

  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "none",
  });

  return { access_token: token };
}

export async function logout(_req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.send({ message: "Logout successful", error: false });
}
