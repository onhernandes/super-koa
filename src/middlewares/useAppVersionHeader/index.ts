import * as Koa from "koa";
import type { SuperKoaFn, SuperKoaOptions } from "../../types";

export const appVersionHeader =
  (options: SuperKoaOptions) => (ctx: Koa.Context, next: Koa.Next) => {
    if (options.appVersion && options.appVersionHeader && options.appVersion) {
      ctx.set(options.appVersionHeader, options.appVersion);
    }

    return next();
  };

const useAppVersionHeader: SuperKoaFn = (app: Koa, options: SuperKoaOptions) =>
  app.use(appVersionHeader(options));

export default useAppVersionHeader;
