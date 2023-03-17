import koaBody, { KoaBodyMiddlewareOptions } from "koa-body";
import { SuperKoaFn } from "../../types";

const useKoaBody: SuperKoaFn = (_, options) => ({
  middlewares: options.useKoaBody
    ? [koaBody(options.useKoaBody as KoaBodyMiddlewareOptions)]
    : [],
});

export default useKoaBody;
