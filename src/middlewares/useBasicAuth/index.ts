import * as Koa from "koa";
import type { SuperKoaFn, SuperKoaOptions } from "../../types";
import basicAuth from "koa-basic-auth";

const useBasicAuth: SuperKoaFn = (app: Koa, options: SuperKoaOptions) =>
  options.useBasicAuth.enable === true &&
  app.use(
    basicAuth({
      name: options.useBasicAuth.username,
      pass: options.useBasicAuth.password,
    })
  );

export default useBasicAuth;
