import { z } from "zod";

export const AppErrorOptionsSchema = z.object({
  code: z.string().or(z.number()),
  httpStatusCode: z.number(),
  metadata: z.any().optional(),
});

export type AppErrorOptions = z.infer<typeof AppErrorOptionsSchema>;

export const PartialAppErrorOptionsSchema = AppErrorOptionsSchema.partial();
