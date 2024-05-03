import { FastifyReply, FastifyRequest } from "fastify";
import { CreateEventBody } from "./event.schema";
import { createEvent } from "./event.service";

export async function createEventHandler(
  req: FastifyRequest<{ Body: CreateEventBody }>,
  reply: FastifyReply
) {
  console.log(req.user);
  const event = req.body;
  const data = {
    ...event,
    userId: req.user.id,
  };
  try {
    const res = await createEvent(data);
    return reply.status(201).send({ message: res, error: false });
  } catch (e) {
    return reply
      .status(500)
      .send({ message: "Event create failed", e, error: true });
  }
}
