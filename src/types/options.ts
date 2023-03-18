import { z } from "zod";

export const RequestIdGeneratorEnum = z.enum(["uuid", "uuidv1", "uuidv4"]);

// @TODO change to headerName
export const ResponseTimeHeader = z.object({
  responseHeaderName: z.string().default("X-Response-Time"),
});

export const RequestId = z.object({
  headerName: z.string().default("X-Request-ID"),
  requestIdGenerator: z
    .union([
      RequestIdGeneratorEnum,
      z.function().args(z.object({}).passthrough()).returns(z.string()),
    ])
    .default("uuidv4"),
});

export const AppVersionHeader = z.object({
  headerName: z.string().default("X-App-Version"),
  appVersion: z.string(),
});

export type AppVersionHeaderConfig = z.infer<typeof AppVersionHeader>;
