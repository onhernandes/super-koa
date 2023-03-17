import { z } from "zod";
import { PartialSuperKoaContext } from "./SuperKoaContext";
import * as Koa from "koa";
import { JWTAuth } from "./useJWTAuth";
import { AppVersionHeader, RequestId, ResponseTimeHeader } from "./options";

export const ZodAnyObject = z.record(z.any());

export const Options = z.object({
  useKoaBody: z.union([ZodAnyObject, z.literal(false)]).default({}),
  useResponseTimeHeader: z
    .union([ResponseTimeHeader, z.literal(false)])
    .default(false),
  useRequestId: z.union([RequestId, z.literal(false)]).default(false),
  useAppVersionHeader: z
    .union([AppVersionHeader, z.literal(false)])
    .default(false),
  useBasicAuth: z
    .union([
      z.object({
        username: z.string(),
        password: z.string(),
      }),
      z.literal(false),
    ])
    .default(false),
  useJWTAuth: z.union([JWTAuth, z.literal(false)]).default(false),
  useErrorManager: z.boolean().default(true),
  loadRoutes: z.string().array().default([]),
  loadMiddlewares: z.string().array().default([]),
});

export type SuperKoaOptions = z.infer<typeof Options>;

const deepPartialOptions = Options.deepPartial();
export type PartialSuperKoaOptions = z.infer<typeof deepPartialOptions>;

export type ObjectType = { [key: string]: any };

export interface SuperKoaFn {
  (app: Koa, options: SuperKoaOptions): PartialSuperKoaContext;
}
