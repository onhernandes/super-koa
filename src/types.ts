// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { z } from "zod";
import * as Koa from "koa";

const BooleanSchemaDefaultsTrue = z.boolean().default(true);
export const Options = z.object({
  useKoaBody: BooleanSchemaDefaultsTrue,
  koaBodyOptions: z.object({}).passthrough().optional(),
  useResponseTimeHeader: BooleanSchemaDefaultsTrue,
  responseTimeHeader: z.string().default("X-Response-Time"),
});

export type SuperKoaOptions = z.infer<typeof Options>;

export type ObjectType = { [key: string]: any };

export type SuperKoaFn = (app: Koa, options: SuperKoaOptions) => unknown;
