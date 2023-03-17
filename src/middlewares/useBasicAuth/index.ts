import type { SuperKoaFn, SuperKoaOptions } from "../../types";
import basicAuth from "koa-basic-auth";

/**
 * Returns the middleware responsible for auth using basic-auth
 * */
const useBasicAuth: SuperKoaFn = (_, options: SuperKoaOptions) => {
  if (options.useBasicAuth === false) {
    return {};
  }
  const basicAuthOptions = {
    name: options.useBasicAuth.username,
    pass: options.useBasicAuth.password,
  };

  return {
    middlewares: {
      auth: { basicAuth: basicAuth(basicAuthOptions) },
    },
  };
};

export default useBasicAuth;
