import { z } from "zod";
import { PartialSuperKoaContext } from "./SuperKoaContext";
import Koa from "koa";
import { JWTAuth } from "./useJWTAuth";
import { AppVersionHeader, RequestId, ResponseTimeHeader } from "./options";

export const ZodAnyObject = z.record(z.any());

export const OptionsZodSchema = z.object({
  opinionated: z.boolean().default(true),
  useKoaBody: z.union([ZodAnyObject, z.literal(false)]).default({}),
  useResponseTimeHeader: z
    .union([ResponseTimeHeader, z.literal(false)])
    .default(false),
  useRequestId: z.union([RequestId, z.literal(false)]).default({}),
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
  applyContext: z.boolean().default(true),
});

export const Options = OptionsZodSchema.transform((opts) => {
  if (opts.opinionated === false) {
    const optEnum = OptionsZodSchema.keyof().enum;
    const opinionatedProperties = [
      optEnum.useKoaBody,
      optEnum.useRequestId,
      optEnum.useErrorManager,
    ];

    for (const k of opinionatedProperties) {
      opts[k] = false;
    }
  }

  return opts;
});

export type SuperKoaOptions = z.infer<typeof OptionsZodSchema>;

const deepPartialOptions = OptionsZodSchema.deepPartial();
export type PartialSuperKoaOptions = z.infer<typeof deepPartialOptions>;

export type ObjectType = { [key: string]: any };

export interface SuperKoaFn {
  (app: Koa, options: SuperKoaOptions): PartialSuperKoaContext;
}
