import { z } from "zod";
import * as Koa from "koa";
import { JWTAuth } from "./useJWTAuth";

export const RequestIdGeneratorEnum = z.enum(["uuid", "uuidv1", "uuidv4"]);

export type ObjectType = { [key: string]: any };

const BooleanSchemaDefaultsTrue = z.boolean().default(true);
export const Options = z.object({
  useKoaBody: BooleanSchemaDefaultsTrue,
  koaBodyOptions: z.object({}).passthrough().optional(),
  useResponseTimeHeader: BooleanSchemaDefaultsTrue,
  responseTimeHeader: z.string().default("X-Response-Time"),
  useRequestId: BooleanSchemaDefaultsTrue,
  requestIdHeader: z.string().default("X-Request-ID"),
  requestIdGenerator: z
    .union([
      RequestIdGeneratorEnum,
      z.function().args(z.object({}).passthrough()).returns(z.string()),
    ])
    .default("uuidv4"),
  useAppVersionHeader: BooleanSchemaDefaultsTrue,
  appVersionHeader: z.string().optional(),
  appVersion: z.string().optional(),
  useBasicAuth: z
    .discriminatedUnion("enable", [
      z.object({
        enable: z.literal(true),
        username: z.string(),
        password: z.string(),
      }),
      z.object({ enable: z.literal(false) }),
    ])
    .default({ enable: false }),
  useJWTAuth: z.union([JWTAuth, z.literal(false)]).default(false),
  loadRoutes: z.union([z.array(z.string()), z.literal(false)]),
  loadMiddlewares: z.union([z.array(z.string()), z.literal(false)]),
});

export type SuperKoaOptions = z.infer<typeof Options>;

export type SuperKoaFn = (app: Koa, options: SuperKoaOptions) => unknown;
