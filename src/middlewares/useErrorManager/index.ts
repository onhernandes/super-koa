import { SuperKoaFn } from "../../types";
import * as Koa from "koa";
import { AppError, Panic } from "../../errors";

export const getMiddleware =
  (): Koa.Middleware => async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next();
    } catch (receivedError: any) {
      let error = receivedError;
      if (!(error instanceof AppError)) {
        error = new Panic({ metadata: error });
      }

      ctx.status = error.httpStatusCode || 500;
      ctx.body = error?.metadata ?? ctx.body;
    }
  };

/**
 * Enables the error manager middleware, which is a built-in middleware
 * that automatically manages SuperKoaErrors and others too!
 **/
const useErrorManager: SuperKoaFn = (_, options) => {
  if (!options.useErrorManager) {
    return {};
  }

  return {
    middlewares: {
      globals: {
        errorManager: getMiddleware(),
      },
    },
  };
};

export default useErrorManager;
