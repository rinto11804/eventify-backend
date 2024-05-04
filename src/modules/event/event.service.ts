import { prisma } from "../../storage/prisma";
import { CreateEventBody } from "./event.schema";

export async function createEvent(data: CreateEventBody, userId: string) {
  const event = await prisma.event.create({
    data: {
      ...data,
      userId
    },
  });

  return event;
}
export async function getEventById(id: string) {
  const event = await prisma.event.findFirst({
    where: {
      id: id,
    },
  });

  return event;
}

export async function deleteEventById(id: string) { 
  await prisma.event.delete({
    where:{
      id:id
    }
  });
}
