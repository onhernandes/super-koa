import * as Koa from "koa";
import {
  useAppVersionHeader,
  useBasicAuth,
  useJWTAuth,
  useKoaBody,
  useRequestId,
  useResponseTimeHeader,
} from "./middlewares";
import { SuperKoaOptions, Options, SuperKoaFn } from "./types";
import * as SuperKoaErrors from "./errors";
import { PartialSuperKoaContext, } from "./types/SuperKoaContext";
import { mergeSuperKoaContexts } from "./helpers";

const optionsEnum = Options.keyof().enum;
export const optionsMapping: Record<string, SuperKoaFn> = {
  [optionsEnum.useKoaBody]: useKoaBody,
  [optionsEnum.useResponseTimeHeader]: useResponseTimeHeader,
  [optionsEnum.useRequestId]: useRequestId,
  [optionsEnum.useAppVersionHeader]: useAppVersionHeader,
  [optionsEnum.useBasicAuth]: useBasicAuth,
  [optionsEnum.useJWTAuth]: useJWTAuth,
};

const superKoa = (app: Koa, inputOptions?: SuperKoaOptions) => {
  const userOptions = Options.parse(inputOptions || {});
  const entries = Object.entries(optionsMapping);
  let superKoaCtx: PartialSuperKoaContext = {};

  for (const [key, fn] of entries) {
    if (Reflect.get(userOptions, key)) {
      const partialContext = fn(app, userOptions);
      superKoaCtx = mergeSuperKoaContexts(superKoaCtx, partialContext);
    }
  }

  return superKoaCtx;
};

export { SuperKoaErrors, superKoa };
export default superKoa;
