import {
  useAppVersionHeader,
  useBasicAuth,
  useJWTAuth,
  useKoaBody,
  useRequestId,
  useResponseTimeHeader,
} from "./middlewares";
import {
  Options,
  OptionsZodSchema,
  SuperKoaFn,
  SuperKoaOptions,
} from "./types";
import * as SuperKoaErrors from "./errors";
import { PartialSuperKoaContext } from "./types/SuperKoaContext";
import { mergeSuperKoaContexts } from "./helpers";
import Koa from "koa";

const optionsEnum = OptionsZodSchema.keyof().enum;
const optionsMapping: Record<string, SuperKoaFn> = {
  [optionsEnum.useKoaBody]: useKoaBody,
  [optionsEnum.useResponseTimeHeader]: useResponseTimeHeader,
  [optionsEnum.useRequestId]: useRequestId,
  [optionsEnum.useAppVersionHeader]: useAppVersionHeader,
  [optionsEnum.useBasicAuth]: useBasicAuth,
  [optionsEnum.useJWTAuth]: useJWTAuth,
};

/**
 * SuperKoa function configures a whole set up API toolbelt
 * @param {Koa} app - Koa application instance
 * @param {SuperKoaOptions} inputOptions - optional input options, defaults to {}
 * @returns PartialSuperKoaContext configured toolbelt for your work
 */
export const SuperKoa = (
  app: Koa,
  inputOptions?: SuperKoaOptions
): PartialSuperKoaContext => {
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

export { SuperKoaErrors };
/** @hidden */
export default { SuperKoa, SuperKoaErrors };
