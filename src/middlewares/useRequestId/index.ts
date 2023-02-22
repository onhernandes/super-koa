import * as Koa from "koa";
import {
  RequestIdGeneratorEnum,
  SuperKoaFn,
  SuperKoaOptions,
} from "../../types";
import uuid from "uuid";

type IdGeneratorsFn = (ctx: Koa.Context) => string;
const RequestIdAvailableGenerators: { [key: string]: IdGeneratorsFn } = {
  [RequestIdGeneratorEnum.enum.uuidv1]: () => uuid.v1(),
  [RequestIdGeneratorEnum.enum.uuid]: () => uuid.v4(),
  [RequestIdGeneratorEnum.enum.uuidv4]: () => uuid.v4(),
};

const useRequestIdHeader: SuperKoaFn = (app: Koa, options: SuperKoaOptions) =>
  app.use((ctx: Koa.Context, next: Koa.Next) => {
    const generateId =
      typeof options.requestIdGenerator === "function"
        ? options.requestIdGenerator
        : RequestIdAvailableGenerators[options.requestIdGenerator];
    ctx.set(options.requestIdHeader, generateId(ctx));
    return next();
  });

export default useRequestIdHeader;
