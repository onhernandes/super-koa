import { SuperKoaFn } from "../../types";
import { parse, sign } from "./jwt";
import getMiddleware from "./parse";

const useJWTAuth: SuperKoaFn = (_, options) => {
  if (!options.useJWTAuth) {
    return {};
  }

  const jwt = {
    sign: sign(options.useJWTAuth),
    parse: parse(options.useJWTAuth),
  };

  return {
    middlewares: {
      auth: {
        parse: getMiddleware(options.useJWTAuth),
      },
    },
    helpers: { auth: { jwt } },
  };
};

export default useJWTAuth;
