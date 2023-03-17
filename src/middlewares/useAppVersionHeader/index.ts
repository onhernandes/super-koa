import * as Koa from "koa";
import type { SuperKoaFn } from "../../types";
import { AppVersionHeaderConfig } from "../../types/options";

export const appVersionHeader =
  (options: AppVersionHeaderConfig) => (ctx: Koa.Context, next: Koa.Next) => {
    ctx.set(options.headerName, options.appVersion);

    return next();
  };

/**
 * Returns a middleware that defines the current API version
 * in the response' headers
 **/
const useAppVersionHeader: SuperKoaFn = (_, options) => {
  if (options.useAppVersionHeader === false) {
    return {};
  }

  const middleware = appVersionHeader(options.useAppVersionHeader);

  return {
    middlewares: {
      globals: {
        appVersionHeader: middleware,
      },
    },
  };
};

export default useAppVersionHeader;
