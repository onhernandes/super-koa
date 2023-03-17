import * as Koa from "koa";
import type { SuperKoaFn } from "../../types";

export const getMiddleware =
  (headerName: string): Koa.Middleware =>
  async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set(headerName, `${ms}ms`);
  };

const useResponseTimeHeader: SuperKoaFn = (_, options) => {
  if (options.useResponseTimeHeader) {
    return {
      middlewares: {
        globals: {
          responseTimeHeader: getMiddleware(
            options.useResponseTimeHeader.responseHeaderName
          ),
        },
      },
    };
  }

  return {};
};

export default useResponseTimeHeader;
