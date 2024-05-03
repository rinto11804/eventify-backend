import { prisma } from "../../storage/prisma";
import { CreateEventBody, CreateEventResponce } from "./event.schema";

export async function createEvent(data: CreateEventBody & { userId: string }) {
  const event = await prisma.event.create({
    data: {
      ...data,
    },
  });

  return event;
}