import * as Koa from "koa";
import { SuperKoaFn } from "../../types";
import uuid from "uuid";
import { RequestIdGeneratorEnum } from "../../types/options";

type IdGeneratorsFn = (ctx: Koa.Context) => string;
const RequestIdAvailableGenerators: { [key: string]: IdGeneratorsFn } = {
  [RequestIdGeneratorEnum.enum.uuidv1]: () => uuid.v1(),
  [RequestIdGeneratorEnum.enum.uuid]: () => uuid.v4(),
  [RequestIdGeneratorEnum.enum.uuidv4]: () => uuid.v4(),
};

export const getMiddleware =
  (requestIdGenerator: any, requestIdHeader: string): Koa.Middleware =>
  (ctx: Koa.Context, next: Koa.Next) => {
    const generateId =
      typeof requestIdGenerator === "function"
        ? requestIdGenerator
        : RequestIdAvailableGenerators[requestIdGenerator];

    const id: string = generateId?.(ctx);

    if (id) {
      ctx.set(requestIdHeader, id);
    }

    return next();
  };

const useRequestIdHeader: SuperKoaFn = (_, options) => {
  if (options.useRequestId === false) {
    return {};
  }

  return {
    middlewares: {
      globals: {
        requestIdHeader: getMiddleware(
          options.useRequestId.requestIdGenerator,
          options.useRequestId.headerName
        ),
      },
    },
  };
};

export default useRequestIdHeader;
