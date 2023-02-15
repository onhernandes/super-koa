// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import * as Koa from "koa";
import { loadRoutes, loadMiddlewares } from "./helpers";
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

const optionsEnum = Options.keyof().enum;
type OptionsMapping = {
  [key: string]: SuperKoaFn;
};
export const optionsMapping: OptionsMapping = {
  [optionsEnum.useKoaBody]: useKoaBody,
  [optionsEnum.useResponseTimeHeader]: useResponseTimeHeader,
  [optionsEnum.useRequestId]: useRequestId,
  [optionsEnum.useAppVersionHeader]: useAppVersionHeader,
  [optionsEnum.useBasicAuth]: useBasicAuth,
  [optionsEnum.useJWTAuth]: useJWTAuth,
  [optionsEnum.loadRoutes]: loadRoutes,
  [optionsEnum.loadMiddlewares]: loadMiddlewares,
};

const superKoa = async (app: Koa, userOptions?: SuperKoaOptions) => {
  const options = Options.parse(userOptions || {});
  const entries = Object.entries(optionsMapping);

  for (const [key, fn] of entries) {
    if (Reflect.get(options, key)) {
      await fn(app, options);
    }
  }
};

export { SuperKoaErrors, superKoa };
export default superKoa;
