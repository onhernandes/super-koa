// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import Koa from "koa";
import koaBody, { KoaBodyMiddlewareOptions } from "koa-body";

const useKoaBody = (
  app: Koa,
  options: Partial<KoaBodyMiddlewareOptions> = {}
) => app.use(koaBody(options));

export default useKoaBody;
