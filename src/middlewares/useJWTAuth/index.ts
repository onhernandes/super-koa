import * as Koa from "koa";
import { SuperKoaOptions } from "../../types";
import generateRefreshTokenRouter from "./generateRefreshTokenRouter";
import validate from "./validate";

const useJWTAuth = (app: Koa, options: SuperKoaOptions): void => {
  if (!options.useJWTAuth) {
    return;
  }

  app.use(validate(options.useJWTAuth));

  const router = generateRefreshTokenRouter(options.useJWTAuth);
  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default useJWTAuth;
