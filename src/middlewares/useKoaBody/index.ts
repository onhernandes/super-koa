// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import Koa from "koa";
import koaBody from "koa-body";
import { SuperKoaOptions } from "../../types";

const useKoaBody = (app: Koa, options: SuperKoaOptions) =>
  app.use(koaBody(options?.koaBodyOptions));

export default useKoaBody;
