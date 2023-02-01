// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import { z } from "zod";
import * as Koa from "koa";

export const Options = z.object({
  useKoaBody: z.boolean().default(true).optional(),
  koaBodyOptions: z.object({}).passthrough().optional(),
});

export type SuperKoaOptions = z.infer<typeof Options>;

export type ObjectType = { [key: string]: any };

export type SuperKoaFn = (app: Koa, options: SuperKoaOptions) => unknown;
