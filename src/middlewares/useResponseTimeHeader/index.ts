// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import * as Koa from "koa";
import type { SuperKoaFn, SuperKoaOptions } from "../../types";

const useResponseTimeHeader: SuperKoaFn = (
  app: Koa,
  options: SuperKoaOptions
) =>
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set(options.responseTimeHeader, `${ms}ms`);
  });

export default useResponseTimeHeader;
