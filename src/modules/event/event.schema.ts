import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createEventSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  date: z.string().date(),
  from: z.string().time(),
  to: z.string().time(),
});

export const { schemas: eventSchema, $ref: $eventRef } = buildJsonSchemas(
  {
    createEventSchema,
  },
  {
    $id: "event",
  }
);

type CreateEventBody = z.infer<typeof createEventSchema>;
