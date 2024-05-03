import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createEventSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  from: z.string().date(),
  to: z.string().date(),
});

const createEventResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  from: z.string().date(),
  to: z.string().date(),
  userId: z.string(),
});

export const { schemas: eventSchema, $ref: $eventRef } = buildJsonSchemas(
  {
    createEventSchema,
    createEventResponseSchema,
  },
  {
    $id: "event",
  }
);

export type CreateEventBody = z.infer<typeof createEventSchema>;
export type CreateEventResponce = z.infer<typeof createEventResponseSchema>;
