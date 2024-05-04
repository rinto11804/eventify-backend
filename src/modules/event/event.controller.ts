import { FastifyReply, FastifyRequest } from "fastify";
import { CreateEventBody } from "./event.schema";
import { createEvent, deleteEventById } from "./event.service";

export async function createEventHandler(
  req: FastifyRequest<{ Body: CreateEventBody }>,
  reply: FastifyReply,
) {
  const event = req.body;
  const userId = req.user.id;
  try {
    const res = await createEvent(event, userId);
    return reply.status(201).send({ message: res, error: false });
  } catch (e) {
    return reply
      .status(500)
      .send({ message: "Event create failed", error: true });
  }
}

export async function deleteEventHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = req.params;
  try {
    await deleteEventById(id);
    return reply
      .status(200)
      .send({ message: "Event deleted successfully", error: false });
  } catch (e) {
    return reply
      .status(500)
      .send({ message: "Event deletion failed", error: true });
  }
}
