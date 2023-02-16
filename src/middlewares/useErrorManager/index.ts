import { SuperKoaFn, SuperKoaOptions } from "../../types";
import * as Koa from "koa";
import { AppError, Panic } from "../../errors";

const useErrorManager: SuperKoaFn = (app: Koa, options: SuperKoaOptions) => {
  app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next();
    } catch (receivedError: any) {
      let error = receivedError;
      if (!(error instanceof AppError)) {
        error = new Panic({ metadata: error });
      }

      ctx.status = error.httpStatusCode;
      ctx.body = error?.metadata ?? ctx.body;
    }
  });
};

export default useErrorManager;
