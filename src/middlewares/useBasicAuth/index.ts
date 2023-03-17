import type { SuperKoaFn, SuperKoaOptions } from "../../types";
import basicAuth from "koa-basic-auth";

const useBasicAuth: SuperKoaFn = (_, options: SuperKoaOptions) => {
  if (options.useBasicAuth) {
    return {
      middlewares: [
        basicAuth({
          name: options.useBasicAuth.username,
          pass: options.useBasicAuth.password,
        }),
      ],
    };
  }

  return {};
};

export default useBasicAuth;
