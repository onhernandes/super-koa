// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import * as Koa from "koa";
import type { SuperKoaFn, SuperKoaOptions } from "../../types";

const useAppVersionHeader: SuperKoaFn = (app: Koa, options: SuperKoaOptions) =>
  app.use((ctx, next) => {
    if (options.appVersion && options.appVersionHeader && options.appVersion) {
      ctx.set(options.appVersionHeader, options.appVersion);
    }

    return next();
  });

export default useAppVersionHeader;
