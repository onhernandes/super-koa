// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { z } from "zod";
import * as Koa from "koa";

export const RequestIdGeneratorEnum = z.enum(["uuid", "uuidv1", "uuidv4"]);

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
});

export type SuperKoaOptions = z.infer<typeof Options>;

export type ObjectType = { [key: string]: any };

export type SuperKoaFn = (app: Koa, options: SuperKoaOptions) => unknown;
