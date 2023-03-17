import { koaBody, KoaBodyMiddlewareOptions } from "koa-body";
import { SuperKoaFn } from "../../types";

/**
 * useKoaBody is a SuperKoaFunction that generates
 * the koa-body package integration, allowing the API
 * to accept JSON data and more
 */
const useKoaBody: SuperKoaFn = (_, options) => {
  if (options.useKoaBody === false) {
    return {};
  }

  const pluginOptions = options.useKoaBody as KoaBodyMiddlewareOptions;
  const middleware = koaBody(pluginOptions);

  return {
    middlewares: {
      globals: {
        koaBody: middleware,
      },
    },
  };
};

export default useKoaBody;
