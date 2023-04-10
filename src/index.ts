import {
  useAppVersionHeader,
  useBasicAuth,
  useJWTAuth,
  useKoaBody,
  useRequestId,
  useResponseTimeHeader,
} from "./middlewares";
import { Options, SuperKoaFn } from "./types";
import * as SuperKoaErrors from "./errors";
import SuperKoaContext from "./types/SuperKoaContext";
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

const superKoa: SuperKoaFn = (app, inputOptions) => {
  const userOptions = Options.parse(inputOptions || {});
  const entries = Object.entries(optionsMapping);
  let superKoaCtx: SuperKoaContext = {
    middlewares: {},
    helpers: {},
  };

  for (const [key, fn] of entries) {
    if (Reflect.get(userOptions, key)) {
      const partialContext = fn(app, userOptions);
      superKoaCtx = mergeSuperKoaContexts(superKoaCtx, partialContext);
    }
  }

  if (inputOptions.applyContext) {
    app.context.superKoa = superKoaCtx;
  }

  return superKoaCtx;
};

export { SuperKoaErrors, superKoa };
export default superKoa;
